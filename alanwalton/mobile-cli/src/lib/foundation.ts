import { InputError } from "@shared/errors-core/exit"
import { z } from "zod"
import type { MobileApp } from "./apps"
import { componentSwiftFor } from "./ios-components"

export const ASC_KEY_ID = "Q5485KN54Y"
export const ASC_ISSUER_ID = "69a6de75-758d-47e3-e053-5b8c7c11a4d1"
export const ASC_KEY_PATH = "$HOME/.appstoreconnect/private_keys/AuthKey_Q5485KN54Y.p8"

export const KEYCHAIN_PASSWORD_ENV = "MACBOOK_KEYCHAIN_PASSWORD"

export const MAC_PATH_PREFIX = 'export PATH="/opt/homebrew/opt/node@22/bin:/opt/homebrew/bin:$PATH"'

const CLEANUP_STACK = [
  '_CLEANUP=""',
  '_cleanup() { if [ -n "$_CLEANUP" ]; then eval "$_CLEANUP"; fi; }',
  '_on_cleanup() { _CLEANUP="$1',
  '$_CLEANUP"; }',
  "trap _cleanup EXIT",
].join("\n")

export const SCRIPT_HEADER = `set -euo pipefail\n${MAC_PATH_PREFIX}\n${CLEANUP_STACK}`

export function readKeychainPassword(): string {
  const parsed = z.string().min(1).safeParse(process.env[KEYCHAIN_PASSWORD_ENV])
  if (!parsed.success) {
    throw new InputError(
      `${KEYCHAIN_PASSWORD_ENV} not set — add it to ~/.secrets.env (needed to unlock the mac codesigning keychain over ssh)`
    )
  }
  return parsed.data
}

export function shellSingleQuote(value: string): string {
  return `'${value.replaceAll("'", "'\\''")}'`
}

const APP_VALUE_ENV: readonly (readonly [string, (app: MobileApp) => string | null])[] = [
  ["NATIVE_SHELL_BUNDLE_ID", (app) => app.bundleId],
  ["NATIVE_SHELL_DISPLAY_NAME", (app) => app.displayName],
  ["NATIVE_SHELL_DEVELOPMENT_TEAM", (app) => app.developmentTeam],
  ["NATIVE_SHELL_WIDGET_BUNDLE_ID", (app) => app.widgetBundleId],
  ["NATIVE_SHELL_APP_PROFILE_NAME", (app) => app.appProfileName],
  ["NATIVE_SHELL_WIDGET_PROFILE_NAME", (app) => app.widgetProfileName],
  ["NATIVE_SHELL_KEYCHAIN_ACCESS_GROUP", (app) => `${app.developmentTeam}.${app.bundleId}`],
  ["NATIVE_SHELL_DEVICE_SECRET_SERVICE", (app) => `${app.bundleId}.device-secret`],
  ["NATIVE_SHELL_COMPONENTS", (app) => componentSwiftFor(app.slug).join(" ")],
]

export function appValueExports(app: MobileApp): readonly string[] {
  return APP_VALUE_ENV.flatMap(([name, read]) => {
    const value = read(app)
    return value === null ? [] : [`export ${name}=${shellSingleQuote(value)}`]
  })
}

export function readNativeShellWidgetEnv(): string | undefined {
  const parsed = z.string().min(1).safeParse(process.env.NATIVE_SHELL_WIDGET)
  return parsed.success ? parsed.data : undefined
}

export function readNativeShellApsEnv(): string | undefined {
  const parsed = z.string().min(1).safeParse(process.env.NATIVE_SHELL_APS)
  return parsed.success ? parsed.data : undefined
}

export function readNativeShellHealthkitEnv(): string | undefined {
  const parsed = z.string().min(1).safeParse(process.env.NATIVE_SHELL_HEALTHKIT)
  return parsed.success ? parsed.data : undefined
}

export function readNativeShellRingCredentialEnv(): string | undefined {
  const parsed = z.string().min(1).safeParse(process.env.NATIVE_SHELL_RING_CREDENTIAL)
  return parsed.success ? parsed.data : undefined
}

export function readNativeShellKokoroTtsEnv(): string | undefined {
  const parsed = z.string().min(1).safeParse(process.env.NATIVE_SHELL_KOKORO_TTS)
  return parsed.success ? parsed.data : undefined
}

export function buildKeychainUnlock(password: string): string {
  const quoted = shellSingleQuote(password)
  const keychain = "$HOME/Library/Keychains/login.keychain-db"
  return [
    `KEYCHAIN_PW=${quoted}`,
    `security unlock-keychain -p "$KEYCHAIN_PW" ${keychain}`,
    `security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$KEYCHAIN_PW" ${keychain} >/dev/null 2>&1`,
    "unset KEYCHAIN_PW",
  ].join("\n")
}

export const MAC_SHELL_CLONE = "$HOME/repos/akasha"

export const CHECKOUT_VAR = "NATIVE_SHELL_CHECKOUT"

export const CHECKOUT_ROOT = `"$${CHECKOUT_VAR}"`

export function buildOnCleanup(command: string): string {
  return `_on_cleanup ${shellSingleQuote(command)}`
}

export function buildRunCheckout(commit: string): string {
  return [
    `${CHECKOUT_VAR}=$(mktemp -d)`,
    buildOnCleanup(
      `git -C ${MAC_SHELL_CLONE} worktree remove --force ${CHECKOUT_ROOT} >/dev/null 2>&1 || rm -rf ${CHECKOUT_ROOT}`
    ),
    `git -C ${MAC_SHELL_CLONE} fetch origin`,
    `git -C ${MAC_SHELL_CLONE} worktree prune`,
    `git -C ${MAC_SHELL_CLONE} worktree add --detach ${CHECKOUT_ROOT} ${commit}`,
    `echo "[checkout] this run compiles ${commit} at $${CHECKOUT_VAR}"`,
  ].join("\n")
}

export function buildNativeSync(opts: {
  readonly app: MobileApp
  readonly nativeShellDir: string
  readonly nativeShellWidget?: string
  readonly nativeShellAps?: string
  readonly nativeShellHealthkit?: string
  readonly nativeShellRingCredential?: string
  readonly nativeShellKokoroTts?: string
  readonly stagedWwwDir?: string
}): string {
  const widget = opts?.nativeShellWidget
  const widgetExport =
    widget !== undefined && widget !== ""
      ? [`export NATIVE_SHELL_WIDGET=${shellSingleQuote(widget)}`]
      : []
  const aps = opts?.nativeShellAps
  const apsExport =
    aps !== undefined && aps !== "" ? [`export NATIVE_SHELL_APS=${shellSingleQuote(aps)}`] : []
  const healthkit = opts?.nativeShellHealthkit
  const healthkitExport =
    healthkit !== undefined && healthkit !== ""
      ? [`export NATIVE_SHELL_HEALTHKIT=${shellSingleQuote(healthkit)}`]
      : []
  const ringCredential = opts?.nativeShellRingCredential
  const ringCredentialExport =
    ringCredential !== undefined && ringCredential !== ""
      ? [`export NATIVE_SHELL_RING_CREDENTIAL=${shellSingleQuote(ringCredential)}`]
      : []
  const kokoroTts = opts?.nativeShellKokoroTts
  const kokoroExport =
    kokoroTts !== undefined && kokoroTts !== ""
      ? [`export NATIVE_SHELL_KOKORO_TTS=${shellSingleQuote(kokoroTts)}`]
      : []
  const injectWww =
    opts?.stagedWwwDir !== undefined && opts.stagedWwwDir !== ""
      ? [`rm -rf www`, `mkdir -p www`, `cp -R ${opts.stagedWwwDir}/. www/`]
      : []
  return [
    `cd ${opts.nativeShellDir}`,
    "npm install --no-workspaces",
    ...injectWww,
    ...appValueExports(opts.app),
    ...widgetExport,
    ...apsExport,
    ...healthkitExport,
    ...ringCredentialExport,
    ...kokoroExport,
    "npm run ios:add",
  ].join("\n")
}

export function ascAuthArgs(): readonly string[] {
  return [
    "-allowProvisioningUpdates",
    "-authenticationKeyPath",
    ASC_KEY_PATH,
    "-authenticationKeyID",
    ASC_KEY_ID,
    "-authenticationKeyIssuerID",
    ASC_ISSUER_ID,
  ]
}
