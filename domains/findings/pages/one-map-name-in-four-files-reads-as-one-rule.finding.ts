import type { Finding } from "../finding.page-type.ts"

export const oneMapNameInFourFilesReadsAsOneRule = {
  id: "01a05cb7-586b-7000-bdc3-cd578efa2720",
  pageTypeSlug: "finding",
  domainSlug: "domain/akasha-check",
  slug: "one-map-name-in-four-files-reads-as-one-rule",
  claim:
    "no-rule-in-two-files reads a name a function does not bind exactly as written, so module-private state sharing a spelling across files makes distinct rules collide. Four pages-ui registries each spelled their Map `registry`, and every one-line accessor over them read alike: seven of the fifteen refusals standing tonight were functions touching four different maps. What this check counts moves with naming convention rather than with duplication alone.",
  evidence:
    "code-rule.module.code.ts:39 emits `names.get(node.text) ?? text`, so only a name the function binds becomes `$0`; every other identifier stands verbatim. All four maps were named `registry`: action-verb-registry.module.code.ts:27, page-display-registry.module.code.ts:5, cover-click-registry.module.code.ts:11, reorder-verb-registry.module.code.ts:11. Their four `unregisterX` bodies each read `$0 : string => { registry . delete ( $0 ) }` and three `getX` bodies each read `$0 : string => { return registry . get ( $0 ) }`, which is the seven. The `registerX` functions escaped only because a parameter type annotation is a free name too and theirs differ, which is the same literalism a-parameter-type-widens-out-of-a-rule-check already filed. Renaming the maps to entriesByVerbId, displaysByKind, handlersByPageTypeSlug and handlersByVerbId at 01e844e02a separated all seven with no line of behaviour changed. The reverse holds as well: a tree that never repeats a private name hides real duplicates from this check. No check was changed, since Alan Approves Checks reserves that.",
} as const satisfies Finding
