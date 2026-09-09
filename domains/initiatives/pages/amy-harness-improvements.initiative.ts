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
      statement: "A certificate renewal reaches the headscale server serving that certificate.",
      workingMemory:
        "cert-manager renewed the secret, but `headscale-0` went on serving the expired one from memory, which is what took the tailnet down on 2026-09-02 and stopped the widgets. `headscale.manifest.code.ts:75` emits a `checksum/tls` annotation that would roll the pod on renewal, but nothing imports that file and the live statefulset carries only `checksum/s3-creds`. The cluster certificate runs to 2026-11-01, so the next renewal is early October.\n",
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
