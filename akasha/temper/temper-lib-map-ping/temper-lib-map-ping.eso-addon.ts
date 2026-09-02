import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibMapPing = {
  id: "01a0605f-625e-7267-be33-c5a31b618626",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-map-ping",
  definition: "the game's map ping functions wrapped in one place every addon reaches",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "map-ping-main",
  partSlugs: [
    "module/map-ping-api",
    "module/map-ping-casts",
    "module/map-ping-compatibility",
    "module/map-ping-constants",
    "module/map-ping-handler",
    "module/map-ping-handler-state",
    "module/map-ping-initialization",
    "module/map-ping-lib",
    "module/map-ping-main",
    "module/map-ping-public-api",
    "module/map-ping-types",
    "module/ping-leaky-bucket",
    "module/ping-rolling-average",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own map ping functions are wrapped rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Every ping change is announced to callers on both sides of the change.",
    },
    {
      invariantKind: "departure",
      statement: "A muted ping is drawn without a sound.",
    },
    {
      invariantKind: "departure",
      statement: "A suppressed ping is drawn as no pin.",
    },
    {
      invariantKind: "departure",
      statement: "A ping the game never announces is announced by a watchdog instead.",
    },
    {
      invariantKind: "departure",
      statement: "A group ping is sent only while the token bucket holds a token.",
    },
    {
      invariantKind: "constraint",
      statement: "This library needs LibDebugLogger loaded first.",
    },
  ],
} as const satisfies EsoAddon
