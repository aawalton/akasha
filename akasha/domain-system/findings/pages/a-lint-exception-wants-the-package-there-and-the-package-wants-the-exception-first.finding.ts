import type { Finding } from "../finding.page-type.ts"

export const aLintExceptionWantsThePackageThereAndThePackageWantsTheExceptionFirst = {
  id: "01a0628f-952c-7971-8a1c-78ad0dbf7bfb",
  pageTypeSlug: "finding",
  slug: "a-lint-exception-wants-the-package-there-and-the-package-wants-the-exception-first",
  domainSlug: "domain/temper",
  claim:
    "A new package whose data tables carry map coordinates cannot land through the commands in either order. `akasha write` refuses the tables under `suspicious/noApproximativeNumericConstant`, and `akasha lint-exception` refuses a `--package-path` that is not there. The navigation add-on landed only by a skeleton commit first: the add-on page and two manifests with no parts, so the folder existed for the exception to name, and the 648 files followed in a third commit.",
  evidence:
    "`akasha write --dry-run` over the 648 files of `temper-navigation-addon` refused 184 times with `lint/suspicious/noApproximativeNumericConstant`, over 59 coordinate tables in seven module families. `akasha lint-exception --package-path akasha/temper/temper-navigation-addon --rule suspicious/noApproximativeNumericConstant --dry-run` answered `akasha/temper/temper-navigation-addon names nothing that is there, and an exception for a package that is not there judges nothing`; the guard is `existsSync` on the directory at `lint-exception.command.code.ts` line 196. The way through was three commits: `e5a7a8baca` landed the page, `package.json` and the add-on manifest with `partSlugs: []`; `865dc440ec` landed the exception; `f6b1cda07b` landed the 648 files. The lorebook tables took the other order, tables at `21c6ef5e56` and exception at `3f6d6e3be5`, before the command existed and while `biome.json` was written by hand. Every add-on with a coordinate table will meet this: the chests, fishing nodes, lorebooks, skyshards, achievements and bosses here are ordinary map data, and 0.31416 on a map is a place rather than pi. The decision this informs is whether the exception may name a package that a following write will bring, or whether the write may carry the exception.",
} as const satisfies Finding
