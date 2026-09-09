import type { Finding } from "../finding.page-type.types.ts"

export const aCommittedSelfSymlinkMakesTheShapeCheckThrow = {
  id: "01a0735b-88cd-7eee-b4d1-427374818f72",
  pageTypeSlug: "finding",
  slug: "a-committed-self-symlink-makes-the-shape-check-throw",
  domain: "code-check/folder-matches-a-shape",
  claim:
    "`folder-matches-a-shape` throws EISDIR and judges nothing over any tree holding a committed symlink to a directory whose parent folder is no workspace package, so three subtrees of `story` are judged by it not at all.",
  evidence:
    "`akasha audit --check folder-matches-a-shape --file-path story` answers `the check folder-matches-a-shape threw at checks/modules/change-walking/change-walking.module.code.ts:277:14, so it judged nothing — EISDIR: illegal operation on a directory, read`, twice over. Asking each subfolder of `story` on its own, 3 of 24 throw: `story/tower`, `story/ui`, and `story/wandering-inn`. Each holds a symlink to a directory named for the package the folder is: `story/tower/story-tower` reaches `../../story/tower`, `story/ui/story-ui` reaches `../../story/ui`, `story/wandering-inn/wandering-inn` reaches `../../story/wandering-inn`. Each is committed, `git ls-tree HEAD` giving mode 120000 for all three, and the working tree is clean, so none is drift. Two more symlinks of the same shape do not throw: `story/engine/core/story-engine-core` and `checks/checks`. What parts them is that the parent of each throwing link holds no `package.json` while the parent of each quiet one does. I first read the three as untracked because `git ls-files -s` piped into `head` cut the symlink off the end of the listing, and `akasha restore` corrected me by answering that HEAD holds the path with mode 120000. I did not read line 277 and did not establish why a package folder is passed over.",
} as const satisfies Finding
