import type { Finding } from "../finding.page-type.ts"

export const theWritTrackersStringLookupLoopedOverLanguagesAndReadOnlyEnglish = {
  id: "01a061cc-a0b1-71ea-8e6a-86c086d734e8",
  pageTypeSlug: "finding",
  slug: "the-writ-trackers-string-lookup-looped-over-languages-and-read-only-english",
  domainSlug: "domain/temper",
  claim:
    "WritWorthy's `str` looked up a display string by walking the client's language list, but its body never used the language it was iterating: it read the English table on every turn. The loop could only ever return English or fall through. The recreation drops the loop, which is behaviour-preserving, and states the lost localisation here.",
  evidence:
    "`temper/game-crafting-addon/src/writ-worthy/i18n.ts` names the loop variable `_lang`, with the leading underscore that marks it unused, and the body reads `I18N_EN[how.name]` and then `how.dynamic(key)` — neither takes the language. The body has no side effect, so one turn and many turns return the same value, and removing the loop changes nothing a player sees. In the same file `i18nStatic(key, _lang)` took a language it never read; the recreation drops that parameter, which Lua callers passing two arguments do not notice. Six locale tables ship beside the English one and nothing reaches them through this function.",
} as const satisfies Finding
