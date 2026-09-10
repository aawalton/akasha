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
        "Alan settled the origin: the app moves to `https://alanwalton.com` by `server.url` in `alanwalton.ios-app.capacitor-config.json`, which no grep for capacitor finds. Three files break: `auth-mode` flips localStorage auth to cookie auth and abandons the session, `browser-client` feeds it, `sim-driver` builds the sim URL. 24 more are allowlists and `.widgetURL` literals to add the origin to. Whether the suppressor touches AutoFill is unverified; the move settles it at no cost.",
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
    {
      statement: "Alan's phone drains its health samples into akasha every day.",
      workingMemory:
        "Health samples exist for every day up to 2026-09-07 and stop: none for the 8th, 9th or 10th. `active-calories-service` says `active calories on 2026-09-07 unchanged` every run, that being the newest day it has. Endurance points come from those calories, so `attribute-endurance` has taken no reading since 2026-09-08 and draws black. The drain is `shell-script/alanwalton-health-samples-drain`. The stop matches the window the widgets broke in.",
    },
  ],
} as const satisfies Initiative
