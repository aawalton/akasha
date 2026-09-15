import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonDeviceSecret = {
  id: "01a0595b-ef57-7f8a-a2ee-3943a015a892",
  type: "shell-script",
  slug: "alanwalton-device-secret",
  definition: "the Swift keeping this device's credential in the keychain",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No method hands the plaintext secret back to the web view.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The route the credential is presented to is pinned in the Swift rather than taken from the caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A credential presented to that route is answered with the status alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A keychain answering with nothing is answered as held by no device.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A route never reached is answered as a status of zero.",
    },
  ],
} as const satisfies ShellScript
