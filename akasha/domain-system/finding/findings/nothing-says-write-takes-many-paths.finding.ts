import type { Finding } from "../finding.page-type.ts"

export const nothingSaysWriteTakesManyPaths = {
  id: "01a04e62-45c2-75fd-ad58-b7b4a2e8b05d",
  pageTypeSlug: "finding",
  slug: "nothing-says-write-takes-many-paths",
  domainSlug: "domain/command-system",
  claim:
    "A caller learns that `akasha write` takes more than one path only by reading its code, and both refusals it prints on the way read as though it took one.",
  evidence:
    "`write.command.code.ts:68` gathers `--file-path` with `valuesOf`, which returns an array, so the flag repeats and pairs positionally with `--content-file`. A dry run naming two paths judged both in one call, so the arity is real. Nothing says so. `write.command.ts` states that the bodies of one call are one gated commit, which implies many without stating it, and the command takes no `--help`. Both refusals a caller meets first are singular: an empty call answers `this call names no --file-path to write and no --remove to take away`, and a refused call answers `1 change(s) were asked for and they land together or not at all`, where the count is the number asked for rather than the number allowed. The cost is not hypothetical. Landing the initiative page type, its two properties and the `partSlugs` edit that names it, I read the singular refusal as the arity and sequenced five calls instead of one. Three of the resulting commits left a page type that no parent named, which `domain-is-named-by-a-parent` would refuse at audit, and one commit existed only to rewrite a file I had written a moment before. The old corpus already carries the rule at `pages/task/define-domain-structure.task.md`: land the family in one call. I did not measure whether any other command's arity reads the same way, and I did not test whether a name reaching a page type the same call adds resolves, which is the gap `relation-resolves` states.",
} as const satisfies Finding
