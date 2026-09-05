import type { TextProperty } from "@akasha/pages-system/text-property"

export type ShellSha = string

export const shellSha = {
  id: "01a0685d-b81f-7896-a766-17b1183ecd8e",
  pageTypeSlug: "text-property",
  slug: "shell-sha",
  propertySlug: "shell-sha",
  definition: "the commit of the app shell a cut was built from",
  max: 40,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A cut built from no separate shell leaves this property off rather than repeating its main sha.",
    },
  ],
} as const satisfies TextProperty
