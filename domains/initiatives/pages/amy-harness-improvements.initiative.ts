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
      statement: "Alan and Jenny have one widget between them for Alan's multiplier.",
      workingMemory:
        "Alan holds what the multiplier is and what the widget shows. Ask him before taking this up.",
    },
  ],
} as const satisfies Initiative
