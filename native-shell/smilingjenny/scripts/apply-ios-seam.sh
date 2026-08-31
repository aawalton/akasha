#!/usr/bin/env bash
set -euo pipefail

PLIST="ios/App/App/Info.plist"
APPDELEGATE="ios/App/App/AppDelegate.swift"
CONFIG="ios/App/App/capacitor.config.json"
PB="/usr/libexec/PlistBuddy"

WIDGET_SRC_DIR="ios-widget"
SHARED_WIDGET_SRC_DIR="../../akasha/code-system/ios-component/ios-components"
SHARED_IOS_SEAM_DIR="../../ios-seam"
WIDGET_NAME="SmilingJennyWidgetExtension"
WIDGET_DEST="ios/App/${WIDGET_NAME}"
WIDGET_BUNDLE_ID="${NATIVE_SHELL_WIDGET_BUNDLE_ID:?is unset. The ios-app page states widget-bundle-id, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_TEAM="${NATIVE_SHELL_DEVELOPMENT_TEAM:?is unset. The ios-app page states development-team, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
WIDGET_DEPLOYMENT_TARGET="17.0"
WIDGET_PROFILE_NAME="${NATIVE_SHELL_WIDGET_PROFILE_NAME:?is unset. The ios-app page states widget-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
APP_PROFILE_NAME="${NATIVE_SHELL_APP_PROFILE_NAME:?is unset. The ios-app page states app-profile-name, and the ops mobile command running this build exports it. This script states no value of its own to fall back to.}"
PROJECT_PBXPROJ="ios/App/App.xcodeproj"

WIDGET_ENABLED="${NATIVE_SHELL_WIDGET:-1}"

WIDGET_REFRESH_ENABLED="${NATIVE_SHELL_WIDGET_REFRESH:-1}"

MONARCH_TAP_ENABLED="${NATIVE_SHELL_MONARCH_TAP:-1}"

APS_ENABLED="${NATIVE_SHELL_APS:-1}"

ENTITLEMENTS_SRC="ios-app/App.entitlements"

if [[ ! -x "$PB" ]]; then
  echo "ERROR: PlistBuddy not found at $PB (this script is macOS-only)." >&2
  exit 1
fi
if [[ ! -f "$PLIST" ]]; then
  echo "ERROR: $PLIST not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if [[ ! -f "$SHARED_IOS_SEAM_DIR/build-stamp.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/build-stamp.sh not found — neither binary could be stamped, and an unstamped binary is refused at the upload gate." >&2
  exit 1
fi
# shellcheck source=ios-seam/build-stamp.sh
. "$SHARED_IOS_SEAM_DIR/build-stamp.sh"
if [[ ! -f "$SHARED_IOS_SEAM_DIR/monarch-url.sh" ]]; then
  echo "ERROR: $SHARED_IOS_SEAM_DIR/monarch-url.sh not found — the monarch-tap relay has no link to open, and appending it without one would emit Swift that does not compile." >&2
  exit 1
fi
# shellcheck source=ios-seam/monarch-url.sh
. "$SHARED_IOS_SEAM_DIR/monarch-url.sh"

"$PB" -c "Delete :ITSAppUsesNonExemptEncryption" "$PLIST" 2>/dev/null || true
"$PB" -c "Add :ITSAppUsesNonExemptEncryption bool false" "$PLIST"
echo "OK: ITSAppUsesNonExemptEncryption=false applied to $PLIST"

if [[ "$WIDGET_ENABLED" != "1" ]]; then
  echo "OK: widget seam (§2) SKIPPED — NATIVE_SHELL_WIDGET=0."
else

if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the widget seam…"
  gem install --user-install xcodeproj
fi

mkdir -p "$WIDGET_DEST"
rm -f "$WIDGET_DEST"/*.swift "$WIDGET_DEST/Info.plist"
cp "$WIDGET_SRC_DIR"/*.swift "$WIDGET_DEST"/
if [[ ! -d "$SHARED_WIDGET_SRC_DIR" ]]; then
  echo "ERROR: $SHARED_WIDGET_SRC_DIR not found — the categorization ring's Swift is authored there and this extension cannot compile without it." >&2
  exit 1
fi
cp "$SHARED_WIDGET_SRC_DIR"/*/*.swift "$WIDGET_DEST"/
cp "$WIDGET_SRC_DIR/Info.plist" "$WIDGET_DEST/Info.plist"
echo "OK: copied widget sources into $WIDGET_DEST"

native_shell_stamp_widget "$WIDGET_DEST"

WIDGET_SEAM_RB=$(mktemp)
cat > "$WIDGET_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path = ENV.fetch("PROJECT_PBXPROJ")
widget_name  = ENV.fetch("WIDGET_NAME")
bundle_id    = ENV.fetch("WIDGET_BUNDLE_ID")
team         = ENV.fetch("WIDGET_TEAM")
deploy_tgt   = ENV.fetch("WIDGET_DEPLOYMENT_TARGET")
profile_name = ENV.fetch("WIDGET_PROFILE_NAME")
app_profile  = ENV.fetch("APP_PROFILE_NAME")
dest_rel     = widget_name # group path relative to ios/App (the project dir)

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# PIN THE APP TARGET TO MANUAL DISTRIBUTION SIGNING, against its own ensured App
# Store profile, whenever the widget is embedded. An embedded .appex and its
# parent app must sign with the SAME certificate; left on automatic, the App
# resolves an Apple Development cert during the archive while the widget signs
# Apple Distribution, and the archive fails with "Embedded binary is not signed
# with the same certificate as the parent app". So this pin belongs to the widget
# seam rather than being a separate opinion about how the app signs.
app.build_configurations.each do |config|
  bs = config.build_settings
  bs["CODE_SIGN_STYLE"] = "Manual"
  bs["PROVISIONING_PROFILE_SPECIFIER"] = app_profile
  bs["CODE_SIGN_IDENTITY"] = "Apple Distribution"
  bs["DEVELOPMENT_TEAM"] = team
end

# Find-or-create the app-extension target (keyed on name → idempotent).
widget = project.targets.find { |t| t.name == widget_name }
widget ||= project.new_target(:app_extension, widget_name, :ios, deploy_tgt)

# CURRENT_PROJECT_VERSION is left to the project-wide value the archive passes
# (CURRENT_PROJECT_VERSION=$BUILD_NUMBER), so the widget's CFBundleVersion always
# matches the app's build number.
app_mv = app.build_configurations.first.build_settings["MARKETING_VERSION"] || "1.0"
widget.build_configurations.each do |config|
  bs = config.build_settings
  bs["PRODUCT_BUNDLE_IDENTIFIER"] = bundle_id
  bs["PRODUCT_NAME"] = "$(TARGET_NAME)"
  bs["INFOPLIST_FILE"] = "#{dest_rel}/Info.plist"
  bs["GENERATE_INFOPLIST_FILE"] = "NO"
  bs["DEVELOPMENT_TEAM"] = team
  # Manual, pinned by name to the profile signing.ts ensures and installs before
  # the archive. Automatic here would demand a nonexistent development profile
  # for the widget bundle id and time out trying to create one over ssh.
  bs["CODE_SIGN_STYLE"] = "Manual"
  bs["PROVISIONING_PROFILE_SPECIFIER"] = profile_name
  bs["CODE_SIGN_IDENTITY"] = "Apple Distribution"
  bs["SWIFT_VERSION"] = "5.0"
  bs["SKIP_INSTALL"] = "YES"
  bs["MARKETING_VERSION"] = app_mv
  bs["IPHONEOS_DEPLOYMENT_TARGET"] = deploy_tgt
  bs["TARGETED_DEVICE_FAMILY"] = "1,2"
  bs["LD_RUNPATH_SEARCH_PATHS"] = ["$(inherited)", "@executable_path/Frameworks", "@executable_path/../../Frameworks"]
  bs["SWIFT_EMIT_LOC_STRINGS"] = "YES"
end

# (Re)build the widget's file group and compile sources from disk — cleared first
# so a re-run never duplicates references. SwiftUI and WidgetKit auto-link on
# import, so nothing needs explicit framework linking.
group = project.main_group.find_subpath(dest_rel, true)
group.set_source_tree("<group>")
group.set_path(dest_rel)
group.children.to_a.each(&:remove_from_project)
widget.source_build_phase.files.to_a.each(&:remove_from_project)
Dir.glob(File.join(File.dirname(project_path), dest_rel, "*.swift")).sort.each do |swift|
  ref = group.new_reference(File.basename(swift))
  widget.source_build_phase.add_file_reference(ref)
end
group.new_reference("Info.plist") # visible in Xcode; not compiled

# The App depends on the widget and embeds it in an "Embed App Extensions"
# copy-files phase (PlugIns). Both guarded → idempotent.
app.add_dependency(widget) unless app.dependencies.any? { |d| d.target == widget }
embed = app.copy_files_build_phases.find { |p| p.symbol_dst_subfolder_spec == :plug_ins }
embed ||= app.new_copy_files_build_phase("Embed App Extensions")
embed.symbol_dst_subfolder_spec = :plug_ins
unless embed.files.any? { |bf| bf.file_ref == widget.product_reference }
  bf = embed.add_file_reference(widget.product_reference)
  bf.settings = { "ATTRIBUTES" => ["RemoveHeadersOnCopy"] }
end

project.save
puts "OK: ensured #{widget_name} target (bundle #{bundle_id}) in #{project_path}"
RUBY
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" WIDGET_NAME="$WIDGET_NAME" WIDGET_BUNDLE_ID="$WIDGET_BUNDLE_ID" \
  WIDGET_TEAM="$WIDGET_TEAM" WIDGET_DEPLOYMENT_TARGET="$WIDGET_DEPLOYMENT_TARGET" \
  WIDGET_PROFILE_NAME="$WIDGET_PROFILE_NAME" APP_PROFILE_NAME="$APP_PROFILE_NAME" \
  ruby "$WIDGET_SEAM_RB"
rm -f "$WIDGET_SEAM_RB"

fi

# shellcheck source=native-shell/smilingjenny/scripts/apply-ios-seam-plugins.sh
. "$(dirname "${BASH_SOURCE[0]}")/apply-ios-seam-plugins.sh"

RING_CREDENTIAL_PLACEHOLDER="__RING_CREDENTIAL_NOT_SUBSTITUTED__"

if [[ "$WIDGET_ENABLED" != "1" ]]; then
  echo "OK: ring-credential seam (§5) SKIPPED — §2 copied no widget sources (NATIVE_SHELL_WIDGET=0)."
elif [[ -z "${NATIVE_SHELL_RING_CREDENTIAL:-}" ]]; then
  echo "WARNING: NATIVE_SHELL_RING_CREDENTIAL is unset or empty — the widget sources keep" >&2
  echo "         their placeholder, so THIS BUILD'S TILE WILL READ AS REFUSED (lock glyph," >&2
  echo "         'Update app') and will never show a count. Set the variable and re-sync to" >&2
  echo "         cut a build that can read the route." >&2
else
  # shellcheck disable=SC2016  # every `$` inside the block below sits in a JS
  node -e '
    const fs = require("fs");
    const path = require("path");
    const dir = process.argv[1];
    const placeholder = process.argv[2];
    const credential = process.env.NATIVE_SHELL_RING_CREDENTIAL || "";
    if (credential === "") {
      console.error("ERROR: NATIVE_SHELL_RING_CREDENTIAL is empty at the substitution.");
      process.exit(1);
    }
    // WHAT LANDS IS A SWIFT STRING LITERAL, so the value is escaped for one. A
    // credential carrying a quote or a backslash would otherwise close the literal
    // early and the extension would fail to COMPILE — at the archive, on the mac,
    // hundreds of lines into an xcodebuild log, for a reason that reads as nothing
    // to do with a credential.
    //
    // A control character is refused rather than escaped. It could be spelled `\n`
    // and compiled, but a credential with a newline in it is far more likely to be a
    // file read with its trailing newline attached than a value anybody meant, and
    // baking that produces a header the route silently rejects.
    if (/[\x00-\x1f\x7f]/.test(credential)) {
      console.error(
        "ERROR: NATIVE_SHELL_RING_CREDENTIAL contains a control character (a trailing " +
        "newline from `$(cat …)` is the usual cause). Pass the value alone.");
      process.exit(1);
    }
    const literal = credential.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    // A literal split/join rather than a regex for the search too: `$&` and `$1` mean
    // something to a replacement string, so a regex would mangle exactly the values
    // nobody would think to test with.
    let replaced = 0;
    let files = 0;
    for (const name of fs.readdirSync(dir).sort()) {
      if (!name.endsWith(".swift")) continue;
      const file = path.join(dir, name);
      const parts = fs.readFileSync(file, "utf8").split(placeholder);
      if (parts.length === 1) continue;
      fs.writeFileSync(file, parts.join(literal));
      replaced += parts.length - 1;
      files += 1;
    }
    // NOT FINDING THE PLACEHOLDER IS AN ERROR, unlike not having a credential. It
    // means the Swift constant moved or was renamed, so this run would produce a
    // build that reads as refused while whoever cut it supplied a working credential
    // and has every reason to believe it went in. That is the silent-wrong-build
    // class, and the loud failure is the whole point of the check.
    if (replaced === 0) {
      console.error(
        "ERROR: no widget source in " + dir + " carries " + placeholder + " — the ring " +
        "credential could not be substituted. RingCredential.baked in " +
        "ios-widget/WidgetFeed.swift is where it belongs; if it moved, this section " +
        "and that constant have to move together.");
      process.exit(1);
    }
    // The COUNT and never the value.
    console.log(
      "OK: substituted the ring credential into " + replaced + " place(s) across " +
      files + " file(s) in " + dir);
  ' "$WIDGET_DEST" "$RING_CREDENTIAL_PLACEHOLDER"
fi

ENTITLEMENTS_DEST="ios/App/App/App.entitlements"
APS_SEAM_RB=$(mktemp)
cat > "$APS_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path     = ENV.fetch("PROJECT_PBXPROJ")
entitlements_rel = "App/App.entitlements" # relative to ios/App (the project dir)

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# Clear any prior reference first so a re-run never duplicates it. The App group maps
# to ios/App/App where the .entitlements is copied.
group = project.main_group.find_subpath("App", true)
group.files.select { |f| f.path == "App.entitlements" }.each(&:remove_from_project)

app.build_configurations.each { |c| c.build_settings["CODE_SIGN_ENTITLEMENTS"] = entitlements_rel }
group.new_reference("App.entitlements") # visible in Xcode; not compiled
puts "OK: set CODE_SIGN_ENTITLEMENTS=#{entitlements_rel} on the App target in #{project_path}"

project.save
RUBY

if [[ ! -f "$ENTITLEMENTS_SRC" ]]; then
  echo "ERROR: $ENTITLEMENTS_SRC not found — the committed App entitlements are missing." >&2
  exit 1
fi
if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the entitlement seam…"
  gem install --user-install xcodeproj
fi

cp "$ENTITLEMENTS_SRC" "$ENTITLEMENTS_DEST"
if [[ "$APS_ENABLED" != "1" ]]; then
  "$PB" -c "Delete :aps-environment" "$ENTITLEMENTS_DEST" 2>/dev/null || true
  echo "OK: aps-environment entitlement SKIPPED — NATIVE_SHELL_APS=0 (key removed)."
fi
echo "OK: composed App entitlements into $ENTITLEMENTS_DEST"
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" ruby "$APS_SEAM_RB"
rm -f "$APS_SEAM_RB"

native_shell_stamp_app "$APPDELEGATE"
