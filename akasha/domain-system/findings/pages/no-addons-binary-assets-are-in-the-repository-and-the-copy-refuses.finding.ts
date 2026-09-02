import type { Finding } from "../finding.page-type.ts"

export const noAddonsBinaryAssetsAreInTheRepositoryAndTheCopyRefuses = {
  id: "01a0625f-1b44-7c07-b3ad-5a1f2e9d8c36",
  pageTypeSlug: "finding",
  slug: "no-addons-binary-assets-are-in-the-repository-and-the-copy-refuses",
  domainSlug: "domain/temper",
  claim:
    "Not one texture file is in this repository, and every add-on whose manifest names one cannot finish its metadata copy. The Lua compiles and the keys are written first, so the refusal arrives after the artifacts a reader would check, and an add-on that reports a failed build has a whole and correct bundle beside the message.",
  evidence:
    "Measured 2026-09-02 while building the collections add-on for the first time.\n\nA search of the whole checkout for the texture suffix answers zero files, and git knows of none either. Yet manifests name them: the crafting add-on names 13 and the collections add-on names 16.\n\nBoth refuse the same way. `namedFilePathsIn` at `akasha/temper/temper-addon-build/addon-metadata-files/addon-metadata-files.module.code.ts:120` throws with the whole list, saying none is beside the page and none is under `metadata/`. `TemperCrafting` and `TemperCollections` were run one after the other and refused with 13 names and 16 names. `TemperEvents`, whose manifest names none, copied clean.\n\nThe order is what makes this misleading. For the collections add-on the compiler had already written a 1,998,314 byte bundle, the load order file, and a 268 byte keys document carrying the real key rather than the empty default. The command then exited non-zero at the copy, and a reader who takes the exit code as the verdict on the compile has the wrong end of it.\n\nThis is not a fault in either add-on's page or manifest. The manifests are faithful copies of what the add-ons state, and the files they name are how the add-on reaches the game's own art. The gap is that the tree keeps no binary and the copier treats a named file it cannot find as a refusal rather than as something fetched elsewhere.\n\nTwo add-ons are measured here and the shape reaches every manifest with the key: crafting, collections, and any other whose assets are art rather than markup.",
} as const satisfies Finding
