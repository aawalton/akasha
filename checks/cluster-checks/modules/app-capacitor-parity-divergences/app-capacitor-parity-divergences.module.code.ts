import type { Divergence } from "../app-capacitor-parity/app-capacitor-parity.module.code.ts"

const DEFERRED_FEATURE =
  "Deferred in-shell interactive feature (#14795); the row renders through the generic PageDetailContent body instead."
const BUSINESS_WEBSITE =
  "Public business-website page (#15649); web-only, outside the app shell — the native shell is an authed app with no public marketing surface."
const KEYBOARD_CONTROL_WEB_ONLY =
  "Keyboard-control surface (#15863): the Mod+K palette / ? sheet / nav commands are keyboard-driven web affordances; the native shell is touch-primary and the nav commands target web-only routes (/home, /principles, /design, /idle), so it intentionally omits them. v1 web-only."

export const CAPACITOR_PARITY_DIVERGENCES: readonly Divergence[] = [
  { axis: "root-hosts", identifier: "CommandPalette", reason: KEYBOARD_CONTROL_WEB_ONLY },
  { axis: "root-hosts", identifier: "ShortcutSheet", reason: KEYBOARD_CONTROL_WEB_ONLY },
  { axis: "root-hosts", identifier: "NavCommands", reason: KEYBOARD_CONTROL_WEB_ONLY },
  {
    axis: "routes",
    identifier: "principles",
    reason: "Web-only informational route; not on the shell's reading spine.",
  },
  {
    axis: "routes",
    identifier: "design",
    reason: "Web-only design-system route; not on the shell's reading spine.",
  },
  {
    axis: "routes",
    identifier: "sms",
    reason: "Public SMS-compliance page (Amy assistant); web-only, outside the app shell.",
  },
  {
    axis: "routes",
    identifier: "privacy",
    reason: `Public Privacy Policy page (#15649); web-only, outside the app shell. ${BUSINESS_WEBSITE}`,
  },
  { axis: "routes", identifier: "about", reason: BUSINESS_WEBSITE },
  { axis: "routes", identifier: "services", reason: BUSINESS_WEBSITE },
  { axis: "routes", identifier: "contact", reason: BUSINESS_WEBSITE },
  { axis: "routes", identifier: "terms", reason: BUSINESS_WEBSITE },
  {
    axis: "routes",
    identifier: "home",
    reason:
      "Web relocates the authed Home dashboard to `/home` because web's `/` is the public business landing (#15649). The native shell keeps Home at its `index` route (no public landing in the native app), so the `home` route identifier is web-only.",
  },
  {
    axis: "routes",
    identifier: "sign-up",
    reason: "Web sign-up route; the shell only bounces unauthenticated users to sign-in.",
  },
  {
    axis: "render-targets",
    identifier: "SurfaceProvider",
    reason:
      "Surface root the Awen reader mounts under. The shell DOES mount it online (#15302), but through the `AwenRemoteReader` wrapper (which fetches the server-composed props client-side), so the JSX identifier stays app-only in the page-detail route file itself while the feature is live.",
  },
  {
    axis: "render-targets",
    identifier: "AwenGameReader",
    reason:
      "Awen player. The shell mounts it online (#15302) via the `AwenRemoteReader` wrapper — which fetches the server-composed envelope cross-origin because the compose is service-role/server-only — so the identifier is app-only in the page-detail route file while the reader renders live in the shell.",
  },
  {
    axis: "render-targets",
    identifier: "PageDetailContent",
    reason:
      "Bare PageDetailContent is app-only via the app's `View properties` display mode, which reaches the property surface directly. The shell renders its generic detail through PageDetailWithReadMark (the #14959 auto-mark-read wrapper over PageDetailContent) and has no such display mode.",
  },
  {
    axis: "render-targets",
    identifier: "ViewPageFrame",
    reason: `View Page / View Properties frame (#15056): mounts the standard "View properties" kebab affordance on a custom display to reach the generic property surface. The shell has no custom-display branches — every custom kind falls through to the generic PageDetailContent body, which IS the property surface — so there is no custom display to frame and the affordance is structurally unneeded. ${DEFERRED_FEATURE}`,
  },
]
