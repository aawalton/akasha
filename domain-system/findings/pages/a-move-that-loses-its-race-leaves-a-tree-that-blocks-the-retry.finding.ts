import type { Finding } from "../finding.page-type.ts"

export const aMoveThatLosesItsRaceLeavesATreeThatBlocksTheRetry = {
  id: "01a06349-4215-781c-a5a3-c1b337e6383c",
  pageTypeSlug: "finding",
  slug: "a-move-that-loses-its-race-leaves-a-tree-that-blocks-the-retry",
  domainSlug: "module/move-spreading",
  claim:
    "A move that loses a ref-lock race puts every body back and says so truthfully, but leaves behind the folders it made at the destination. That tree holds no file and nothing git tracks, so nothing reports it. The retry is then refused, because the guard asks whether the destination path resolves and an empty folder answers yes. The command has blocked itself, and the refusal reads as a real occupant rather than as its own debris.",
  evidence:
    "Hit on 2 September moving `akasha/story/reader` to `akasha/story/ui`. The command answered that what was written was put back. Of the bodies that was true: HEAD and the working tree were both clean and every file was at the source. Of the folders it was not. 27 empty directories were left under `akasha/story/ui`.\n\nBoth retries were refused with `akasha/story/ui is already there, and a folder names the path it becomes rather than a parent to arrive inside`. That text is `move-spreading.module.code.ts:46`, reached from line 44, which is `if (existsSync(join(root, to)))`. `existsSync` answers true for a folder holding nothing, so what the failed run left reads exactly like a destination somebody else occupies.\n\nCleared by hand. I counted 0 non-directory entries and 0 tracked files under the destination first, then ran `find akasha/story/ui -depth -type d -delete`. The move landed at `a48eab071d` on the next attempt with no other change.\n\nTwo repairs are open here and they are not one repair. The guard could ask what is held rather than what resolves. The rollback could take back the folders it made as well as the bodies it wrote. Only the second leaves nothing for a later reader to puzzle over, and only the first protects a retry from debris some earlier run left.",
} as const satisfies Finding
