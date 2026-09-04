import type { Finding } from "../finding.page-type.ts"

export const aMoveCarriesNothingIntoAkasha = {
  id: "01a05b5a-708e-793f-b0ca-09e8413431bb",
  pageTypeSlug: "finding",
  slug: "a-move-carries-nothing-into-akasha",
  domainSlug: "workspace-package/command-system",
  claim:
    "`akasha move` refuses any path that is not under `akasha/`, so it cannot carry a file into the folder. The migration's central act, a package standing outside akasha coming to stand inside it, has no command. It is done by writing every file anew through `akasha write` and deleting the originals with plain git, which is two commits where the command promises one, and leaves the old copy and the new copy both standing in between.",
  evidence:
    "Run against the first file of the first package this initiative scopes: `akasha move --from shared/pages-url/src/cover.ts --to akasha/pages-system/pages-url/cover-url/cover-url.module.code.ts --message probe --dry-run` writes nothing and answers ``shared/pages-url/src/cover.ts` is not under `akasha/` — a path is read against the repository root, and this carries nothing in or out of that folder`. The `--to` path is inside the folder; only `--from` stands outside, and that alone is refused. `akasha move --help` says `files carried to new paths, with what they name and what names them repointed in the same act` and states no such limit, so the limit is met only by running it. The initiative `amy-jenny-unreviewed-widget` holds eight intents of the form `X stands in akasha`, and each one is this act. `akasha write --help` takes `--file-path <path>` described as `a path under `akasha/` to write`, so the two halves cannot be one commit: the new files land through the gate, and the old ones are removed by plain git in a second commit afterwards.",
} as const satisfies Finding
