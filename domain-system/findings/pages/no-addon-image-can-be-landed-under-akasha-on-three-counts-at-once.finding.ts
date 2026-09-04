import type { Finding } from "../finding.page-type.ts"

export const noAddonImageCanBeLandedUnderAkashaOnThreeCountsAtOnce = {
  id: "01a062fd-3e73-71af-b029-48663da2d85f",
  pageTypeSlug: "finding",
  slug: "no-addon-image-can-be-landed-under-akasha-on-three-counts-at-once",
  domainSlug: "domain/temper",
  claim:
    "Three findings record add-on manifests naming DDS images no file holds, and each stops at the symptom. The cause is that akasha cannot take a DDS. Offering the sixteen the collections add-on names to `akasha write` draws three refusals at once: no page claims the file, six are over the byte ceiling, and every one is raw bytes a search cannot read. These images are not merely absent but unlandable, and no recreated add-on gets its art back until a page type can hold a body that is not text.",
  evidence:
    "`akasha write --dry-run` over `akasha/temper/temper-collections-addon/Icons/*.dds` at `328a092008` answered with all three: `no page claims this file`, `16,512 bytes, over the 15,000 byte ceiling` for the six book icons, and `line 1 column 6 is the first of 4612 raw NUL bytes, which hide the whole file from a search`. Nothing was written. The symptom is filed three times already, at `the-navigation-addon-names-fifteen-images-that-are-not-in-the-repository`, `a-manifest-names-textures-no-copy-of-the-addon-ever-held` and `lib-shifter-box-names-textures-no-file-holds`, and none of the three says why the images cannot come back. This repository has never held one: `git log --all -- '*.dds'` answers 0 commits over 25,021, against 1,096 for `*.json` and 35 for `*.xml` by the same pathspec shape, and its first commit is `a1d265eda3` on 2026-08-25. The sixteen are recoverable, though. Byte-identical copies are in the deployed game folder under `live/AddOns/TemperCollections/Icons` and in a pre-akasha checkout dated 2026-08-22 at `worktrees/orchestrator-pipeline-load/7f53205-tl7uqoed`; the two sets agree on a sorted digest of their md5s. Neither place is this repository, so what they show is that the art can be recovered, not that it was ever tracked. Until a page type can hold a binary body, `akasha temper-addon-build` keeps compiling TemperCollections to 1,998,314 bytes of Lua with zero errors and then refusing at exit 3 on the copy step, which is what it did at `ea92806767`.",
} as const satisfies Finding
