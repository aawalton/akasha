import { ASC_ISSUER_ID, ASC_KEY_ID, buildOnCleanup } from "../foundation/foundation.module.code.ts"
import type { MobileApp } from "../mobile-app/mobile-app.module.code.ts"

export type SigningFailureClass =
  | "ASC_PERMISSION_DENIED"
  | "CONCURRENT_BUILD_MUTATION"
  | "SIGNING_KEYCHAIN_ERROR"

export interface SigningFailure {
  readonly failureClass: SigningFailureClass
  readonly remediation: string
}

const ASC_PERMISSION_REMEDIATION =
  `App Store Connect API key ${ASC_KEY_ID} lacks provisioning-profile management permission — ` +
  "grant it the App Manager (or Admin) role in App Store Connect → Users and Access → " +
  "Integrations, then re-run."

const CONCURRENT_BUILD_MUTATION_REMEDIATION =
  "two `akasha deploy` builds raced on the shared mac checkout (Package.swift regenerated " +
  "mid-archive, or a shared DerivedData build.db hit a concurrent-access I/O error) — the " +
  "mac build mutex now serializes builds, so simply re-run: the retry runs alone under the " +
  "lock. If it recurs, a prior build likely left a stale lock — check " +
  "$HOME/.appstoreconnect/deploy-testflight.lock on the mac (a live-pid holder is a real " +
  "concurrent build; a dead-pid holder is auto-stolen) and confirm mac disk health."

const KEYCHAIN_REMEDIATION =
  "codesign could not access the distribution signing key on the macbook — ensure the login " +
  "keychain holds the iOS Distribution cert + its private key and that no stale keychain " +
  "shadows it earlier in the search list, then re-run."

export function classifyTestflightFailure(output: string): SigningFailure | undefined {
  if (output.includes("ASC_PERMISSION_DENIED")) {
    return { failureClass: "ASC_PERMISSION_DENIED", remediation: ASC_PERMISSION_REMEDIATION }
  }
  if (
    output.includes("CONCURRENT_BUILD_MUTATION") ||
    output.includes("was modified during the build") ||
    (output.includes("build.db") && output.includes("disk I/O error"))
  ) {
    return {
      failureClass: "CONCURRENT_BUILD_MUTATION",
      remediation: CONCURRENT_BUILD_MUTATION_REMEDIATION,
    }
  }
  if (
    output.includes("errSecInternalComponent") ||
    output.includes("Cloud signing permission error") ||
    output.includes("SIGNING_KEYCHAIN_ERROR")
  ) {
    return { failureClass: "SIGNING_KEYCHAIN_ERROR", remediation: KEYCHAIN_REMEDIATION }
  }
  return undefined
}

const LOGIN_KEYCHAIN = "$HOME/Library/Keychains/login.keychain-db"

export function buildLoginOnlyKeychainScope(): string {
  return [
    "KC_ORIG_LIST=$(security list-keychains -d user | sed 's/^[[:space:]]*//; s/\"//g' | tr '\\n' ' ')",
    buildOnCleanup("security list-keychains -d user -s $KC_ORIG_LIST >/dev/null 2>&1 || true"),
    `security list-keychains -d user -s "${LOGIN_KEYCHAIN}"`,
  ].join("\n")
}

const ASC_ENSURE_RUBY = String.raw`require "openssl"; require "base64"; require "json"; require "net/http"; require "uri"; require "time"; require "fileutils"
KEY_ID = ENV["ASC_KEY_ID"]; ISSUER = ENV["ASC_ISSUER_ID"]; BUNDLE = ENV["ASC_BUNDLE_ID"]
PROFILE_NAME = ENV["ASC_PROFILE_NAME"].to_s
if PROFILE_NAME.empty?
  puts "SIGNING_KEYCHAIN_ERROR: ASC_PROFILE_NAME not set"; exit 1
end
CERT_SHA1 = (ARGV[0] || "").downcase.gsub(/[^0-9a-f]/, "")
OUT = ARGV[1] or abort("no uuid out file")
KEY_PATH = File.expand_path("~/.appstoreconnect/private_keys/AuthKey_#{KEY_ID}.p8")
def fail_kc(m); puts "SIGNING_KEYCHAIN_ERROR: #{m}"; exit 1; end
def deny!(d); puts "ASC_PERMISSION_DENIED: #{d}"; exit 1; end
fail_kc("ASC key .p8 missing on the mac") unless File.exist?(KEY_PATH)
def b64u(s); Base64.urlsafe_encode64(s).delete("="); end
ec = OpenSSL::PKey::EC.new(File.read(KEY_PATH)); now = Time.now.to_i
signing = "#{b64u({alg:"ES256",kid:KEY_ID,typ:"JWT"}.to_json)}.#{b64u({iss:ISSUER,iat:now,exp:now+900,aud:"appstoreconnect-v1"}.to_json)}"
der = ec.sign(OpenSSL::Digest::SHA256.new, signing); asn = OpenSSL::ASN1.decode(der)
r = asn.value[0].value.to_s(2).rjust(32, "\x00"); s = asn.value[1].value.to_s(2).rjust(32, "\x00")
JWT = "#{signing}.#{b64u(r + s)}"
def api(method, path, body = nil)
  uri = URI("https://api.appstoreconnect.apple.com#{path}")
  klass = {"GET"=>Net::HTTP::Get,"POST"=>Net::HTTP::Post,"DELETE"=>Net::HTTP::Delete}[method]
  req = klass.new(uri); req["Authorization"] = "Bearer #{JWT}"; req["Content-Type"] = "application/json"
  req.body = body.to_json if body
  res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) { |h| h.request(req) }
  deny!("#{method} #{path} #{res.code}") if res.code == "401" || res.code == "403"
  [res.code, (res.body.nil? || res.body.empty? ? {} : JSON.parse(res.body))]
end
code, certs = api("GET", "/v1/certificates?limit=200")
fail_kc("cannot list certificates (#{code})") unless code == "200"
cert = (certs["data"] || []).find do |c|
  next false unless (c.dig("attributes","certificateType") || "").include?("DISTRIBUTION")
  content = c.dig("attributes","certificateContent"); next false unless content
  OpenSSL::Digest::SHA1.new(OpenSSL::X509::Certificate.new(Base64.decode64(content)).to_der).hexdigest.downcase == CERT_SHA1
end
fail_kc("local distribution cert not registered in App Store Connect") unless cert
cert_id = cert["id"]
code, bids = api("GET", "/v1/bundleIds?limit=200")
bid = (bids["data"] || []).find { |b| b.dig("attributes","identifier") == BUNDLE }
unless bid
  code, created = api("POST", "/v1/bundleIds", {data:{type:"bundleIds",attributes:{identifier:BUNDLE,name:BUNDLE.gsub(".", " "),platform:"IOS"}}})
  fail_kc("cannot register bundle id (#{code})") unless code == "201"
  bid = created["data"]
end
bid_id = bid["id"]
caps_new = false
(ENV["ASC_ENSURE_CAPABILITIES"] || "").split(",").map(&:strip).reject(&:empty?).each do |cap|
  code, _ = api("POST", "/v1/bundleIdCapabilities", {data:{type:"bundleIdCapabilities",attributes:{capabilityType:cap},relationships:{bundleId:{data:{type:"bundleIds",id:bid_id}}}}})
  fail_kc("cannot enable #{cap} capability (#{code})") unless code == "201" || code == "409"
  caps_new = true if code == "201"
end
code, profs = api("GET", "/v1/profiles?limit=200&include=bundleId,certificates")
data = profs["data"] || []
mine = data.select do |p|
  a = p["attributes"]; b = p.dig("relationships","bundleId","data")
  a["profileType"] == "IOS_APP_STORE" && b && b["id"] == bid_id
end
match = mine.find do |p|
  next false unless p.dig("attributes","profileState") == "ACTIVE"
  (p.dig("relationships","certificates","data") || []).map { |x| x["id"] }.include?(cert_id)
end
match = nil if caps_new
unless match
  mine.each { |p| api("DELETE", "/v1/profiles/#{p["id"]}") }
  code, created = api("POST", "/v1/profiles", {data:{type:"profiles",attributes:{name:PROFILE_NAME,profileType:"IOS_APP_STORE"},relationships:{bundleId:{data:{type:"bundleIds",id:bid_id}},certificates:{data:[{type:"certificates",id:cert_id}]}}}})
  fail_kc("cannot create app-store profile (#{code})") unless code == "201"
  match = created["data"]
end
code, full = api("GET", "/v1/profiles/#{match["id"]}")
a = full.dig("data","attributes") || {}
uuid = a["uuid"]; content = a["profileContent"]
fail_kc("ensured profile has no uuid/content") unless uuid && content
dir = File.expand_path("~/Library/MobileDevice/Provisioning Profiles"); FileUtils.mkdir_p(dir)
File.binwrite("#{dir}/#{uuid}.mobileprovision", Base64.decode64(content))
File.write(OUT, uuid)
puts "PROFILE_ENSURED uuid=#{uuid} cert=#{cert_id}"
`

function ensureProfileForBundle(opts: {
  readonly bundleId: string
  readonly profileName: string
  readonly uuidVar: string
  readonly capabilities?: readonly string[]
}): readonly string[] {
  const fileVar = `${opts.uuidVar}_FILE`
  return [
    `# ensure + install the App Store provisioning profile for ${opts.bundleId}`,
    "ASC_ENSURE_RB=$(mktemp)",
    `${fileVar}=$(mktemp)`,
    `cat > "$ASC_ENSURE_RB" <<'RUBY'`,
    ASC_ENSURE_RUBY,
    "RUBY",
    `ASC_KEY_ID='${ASC_KEY_ID}' ASC_ISSUER_ID='${ASC_ISSUER_ID}' ASC_BUNDLE_ID='${opts.bundleId}' ASC_PROFILE_NAME='${opts.profileName}' ASC_ENSURE_CAPABILITIES='${(opts.capabilities ?? []).join(",")}' ruby "$ASC_ENSURE_RB" "$SIGN_CERT_SHA1" "$${fileVar}"`,
    'rm -f "$ASC_ENSURE_RB"',
    `${opts.uuidVar}=$(cat "$${fileVar}" 2>/dev/null || true); rm -f "$${fileVar}"`,
    `if [ -z "$${opts.uuidVar}" ]; then echo "SIGNING_KEYCHAIN_ERROR: provisioning profile uuid not resolved for ${opts.bundleId}"; exit 3; fi`,
  ]
}

export function buildEnsureAppStoreProfile(app: MobileApp): string {
  const widgetProfile =
    app.widgetBundleId === null || app.widgetProfileName === null
      ? []
      : ensureProfileForBundle({
          bundleId: app.widgetBundleId,
          profileName: app.widgetProfileName,
          uuidVar: "SIGN_PROFILE_UUID_WIDGET",
        })
  return [
    "# discover the local distribution signing identity for manual signing (login keychain)",
    `SIGN_CERT_SHA1=$(security find-identity -v -p codesigning "${LOGIN_KEYCHAIN}" | grep -iE "Distribution" | head -1 | awk '{print $2}' || true)`,
    'if [ -z "$SIGN_CERT_SHA1" ]; then echo "SIGNING_KEYCHAIN_ERROR: no distribution signing identity in the login keychain"; exit 3; fi',
    ...ensureProfileForBundle({
      bundleId: app.bundleId,
      profileName: app.appProfileName,
      uuidVar: "SIGN_PROFILE_UUID",
      capabilities: app.ascCapabilities,
    }),
    ...widgetProfile,
  ].join("\n")
}
