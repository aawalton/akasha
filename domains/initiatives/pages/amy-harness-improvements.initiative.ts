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
        'The form is already right: a real `<form>`, `type="password"`, `autoComplete="current-password"` (`auth-page-content.module.code.tsx:128-164`). Missing is the pairing iOS matches a credential on: the app entitlements declare no `com.apple.developer.associated-domains`, and no `apple-app-site-association` is served. The webview also runs under `capacitor://localhost`, no https origin. Past both, `alanwalton-keyboard-accessory-suppressor` nils `inputAccessoryView`, taking away the AutoFill bar.\n',
    },
    {
      statement: "Alan and Jenny have one widget between them for Alan's multiplier.",
      workingMemory:
        "Alan holds what the multiplier is and what the widget shows. Ask him before taking this up.",
    },
  ],
} as const satisfies Initiative
