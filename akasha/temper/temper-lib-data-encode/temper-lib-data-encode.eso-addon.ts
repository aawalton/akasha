import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibDataEncode = {
  id: "01a06061-969c-79fe-8013-c5a31045b336",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-data-encode",
  definition: "an arbitrary Lua table packed into text the game may carry and read back",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "data-encode-entry",
  partSlugs: [
    "module/data-encode-surface",
    "module/data-encode-encoder",
    "module/data-encode-decoder",
    "module/data-encode-dictionary",
    "module/data-encode-charset",
    "module/data-encode-runtime",
    "module/data-encode-self-test",
    "module/data-encode-casts",
    "module/data-encode-types",
    "module/data-encode-entry",
    "type-declaration/data-encode-entry-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Encoding a table and decoding the text again answers the table encoded.",
    },
    {
      invariantKind: "constraint",
      statement: "The alphabet leaves out every character the game reads as markup.",
    },
    {
      invariantKind: "departure",
      statement: "A control character is never a character of the alphabet.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value seen three times or more is put in a dictionary and referred to by index.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in a dictionary rather than have the encoder work one out.",
    },
    {
      invariantKind: "constraint",
      statement: "An encoded line runs to no more than 998 characters.",
    },
    {
      invariantKind: "departure",
      statement: "A function met while encoding is skipped rather than encoded.",
    },
    {
      invariantKind: "departure",
      statement: "The game reaches the library through one global name.",
    },
  ],
} as const satisfies EsoAddon
