import type { Refusal } from "../refusal.page-type.ts"

export const pageKeySpelledCamel = {
  id: "01a06611-3994-7a86-afdf-5e24799d8cb0",
  pageTypeSlug: "refusal",
  slug: "page-key-spelled-camel",
  title: "Page key spelled camel",
  text: "`{key}` is no property of `{slug}`, and `{meant}` is — the same name, spelled the way a file spells it. A page's file spells every key in kebab-case, and whatever reads it camelises on the way out, so the spelling you read a value back under is never the one you write it under. Written this way the key lands, reads back under a name nothing asked for, and nothing says so.",
} as const satisfies Refusal
