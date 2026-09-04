import type { Finding } from "../finding.page-type.ts"

export const aDataBesideFileIsHeldToTheCodeCeiling = {
  id: "01a06572-ebf1-7540-92e1-a2aae921d3af",
  pageTypeSlug: "finding",
  slug: "a-data-beside-file-is-held-to-the-code-ceiling",
  domainSlug: "workspace-package/checks",
  claim:
    "A file property held as `json` is judged against the 15,000 byte code ceiling, so a data blob beside a page cannot land through the gate however small the page is.",
  evidence:
    "`ceilingFor` in file-length.code-check.code.ts answers ENTRY_CEILING for `jsonl` and MARKUP_CEILING for `xml`, and CEILING for everything else, so a `json` beside-file falls to the code ceiling. The temper migration met this at `completion`, whose own page says the file is kept word for word as the game handed it over. Of 24 account-character completions only the four under 15,000 bytes had landed; the other twenty run 120,610 to 248,169 bytes, the account's runs 1,119,574, and a player's settings runs 42,932. I carried all 22 in mechanically, which runs no checks, and the landing formatter pretty-printed them, taking erin-solstice from 248,169 to 447,765 bytes. Every one is semantically equal to its source by `jq -cS`. Nothing else in akasha holds a large `json` beside-file: the only beside-files over 15,000 bytes today are nine `markup.xml` addon layouts, which have a ceiling of their own.",
} as const satisfies Finding
