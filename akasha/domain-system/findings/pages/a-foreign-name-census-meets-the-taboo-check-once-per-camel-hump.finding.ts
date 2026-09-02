import type { Finding } from "../finding.page-type.ts"

export const aForeignNameCensusMeetsTheTabooCheckOncePerCamelHump = {
  id: "01a063ce-eadb-7000-b431-b171f53d614b",
  pageTypeSlug: "finding",
  slug: "a-foreign-name-census-meets-the-taboo-check-once-per-camel-hump",
  domainSlug: "domain/temper",
  claim:
    "A census of foreign identifiers meets the taboo-term check once per collision, because the check splits camelCase and the names belong to the game rather than to whoever writes them down. The base-game colon-method census trips nine terms. Its string-id sibling met none, because an `SI_*` name is screaming snake and has no camel humps to split.",
  evidence:
    "Measured 2026-09-02 by dry-running the `akasha write` call that `ops eso generate-colon-methods` prepares: 52 files, 12,854 method names read from the ~/esoui clone at API 101050, divided into 25 runs of at most 13,563 bytes each. Exit 2. All 118 lines of the answer were NAMING DECISIONS over nine terms. Nothing else refused, so the 15,000 byte ceiling, `no-re-export` over the aggregate composing the runs, and every page shape were admitted.\n\nEach refusal reads `The term is inside a camelCase name your change writes rather than a word of its own`, and each names a sense that is not the game's. One bars the documents a seat is held to, met inside ESO's `GetKeybinding`. One bars a seat present but not working, met inside the ESO method name for halting an animation. One bars a document arriving with a read.\n\nSo what keeps a foreign-name census out is neither the ceiling, which dividing answers, nor the want of a reader, which `check-addon-sandbox-load` supplies for the string ids. It is that the check judges names nobody here chose and nobody here may rename, and the nine decisions are a cost per census that grows as the census grows.\n\nThe string-id sibling landed 78 files with none of this. `SI_ABANDON_HOME_CAMPAIGN_FREE` parts on underscores rather than humps, so no term is found inside it.",
} as const satisfies Finding
