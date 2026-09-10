import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's app fills his password in from 1Password.",
      workingMemory:
        "The form is already right, so order matters. `alanwalton-keyboard-accessory-suppressor` nils `inputAccessoryView` by default, taking away the bar 1Password fills from, so nothing is offered at all: mend that first. Do not reach for an https origin — `capacitor://localhost` is named in 29 files, among them the auth-proxy manifest, the CORS module, the media and error routes, and the widget tap links. The entitlements declare no `com.apple.developer.associated-domains`.\n",
    },
    {
      statement: "All of Jenny's widgets work.",
      workingMemory:
        "Jenny has three tiles, `smilingjenny-surplus`, `smilingjenny-safety-level` and `smilingjenny-categorize`, and only categorize draws. All three show Alan's readings, carried to smilingjenny.me by a second line in each readout's relay service. Her routes admit on `SMILINGJENNY_RING_CREDENTIAL` baked into the build, where Alan's mint a per-device keychain secret. The relay store is an in-process Map, so a pod restart blacks every tile.",
    },
    {
      statement: "Alan and Jenny have one widget between them for Alan's multiplier.",
      workingMemory:
        "Alan settled the tile: label Cost, reading the multiplier of the block he is in, green at zero, black above one, and between them yellow where the surplus is blue and red where the surplus is green. `module/cost-color` holds that rule with a test, and `computed-property-module/cost-multiplier` holds the ladder. Left to build: the readout, a reading service, two routes, two widget pages, and the tiles in both iOS extensions.",
    },
  ],
} as const satisfies Initiative
