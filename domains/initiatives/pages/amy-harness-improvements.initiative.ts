import type { Initiative } from "../initiative.page-type.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's widgets load.",
      workingMemory:
        'TestFlight build 208 (`c2aba127`) puts a word under "Sign in" naming which keychain case refused the tile: `no key`, `2 keys`, `key err <n>` or `key ok`. `DeviceSecretReader.read()` answers nothing both for no keychain item and for two, so that word is what separates them. The pod now carries the access query naming `person` rather than `personSlug`. Alan reads the word off any tile next.\n',
    },
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
