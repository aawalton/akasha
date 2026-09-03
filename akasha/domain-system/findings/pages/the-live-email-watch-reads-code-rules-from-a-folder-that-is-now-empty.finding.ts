import type { Finding } from "../finding.page-type.ts"

export const theLiveEmailWatchReadsCodeRulesFromAFolderThatIsNowEmpty = {
  id: "01a06864-a756-72c4-9f16-a72a80d9249b",
  pageTypeSlug: "finding",
  slug: "the-live-email-watch-reads-code-rules-from-a-folder-that-is-now-empty",
  domainSlug: "domain/akasha-migration",
  claim:
    "`akasha/email-watch/inbox-run` runs live as `services/email-watch.ts` and reads Alan's email rules off markdown in `pages/email-rule-{code,agent}/<person>` through `tools/lib/email-rules.ts`. The 54 code rules now stand as pages under `akasha/alan/harness/inboxes/email-rules/email-rule-codes/pages`, and their markdown is ablated, so the running service sees no code rule at all until that reader is repointed.",
  evidence:
    "`rulesOf` in `tools/lib/email-rules.ts` walks `ruleFolderIn(person, kind)` for each kind `tools/lib/email-rule-set.ts` declares, which is `code` and `agent`, and the folder each resolves to comes from the `path-pattern` on `pages/rules-engine-rule-set/email-rule.rules-engine-rule-set.md`: `^pages/email-rule-(?<kind>agent|code)/(?<holder>[a-z0-9-]+)/...`. Nothing in that path reaches the akasha folder.\n\nThe failure is quiet rather than loud. `rulesOf` wraps its `readdirSync` in `try { ... } catch { continue }`, so an empty or missing code folder yields no rule and raises nothing. `decide` then returns the first matching rule, and with no code rule loaded every message falls through to the agent rules, whose markdown is a sibling lane's block and still stands. The `everything-else` agent rule catches what nothing else does, so mail is judged by an agent rather than filed by pattern. Nothing is deleted and nothing crashes; the cost is that fifty-four settled patterns stop applying, among them the fifteen-minute sign-in-link delay and the six rules that forward to Jenny.\n\nWhat the repoint needs: `tools/lib/email-rules.ts`, `tools/lib/email-rule.ts`, `tools/lib/email-rule-set.ts` and `tools/lib/email-partition.ts` all read the old layout, and `akasha/email-watch/inbox-run/inbox-run.module.code.ts` is their one caller. That is the `tools` block rather than this one.\n\nNot measured: how long the service has been running against the empty folder, and whether the agent fallback keeps up with the volume the code rules were absorbing.",
} as const satisfies Finding
