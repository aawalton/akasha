import type { Module } from "@akasha/code-system/module"

export const serviceHash = {
  id: "01a0685d-4b35-7005-a6aa-76a9e30cc3fe",
  pageTypeSlug: "module",
  slug: "service-hash",
  definition: "one hash folding a service's source files together with what it is told to run",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A change to the command, the port or the working directory changes the hash even where no source file changed.",
    },
  ],
} as const satisfies Module
