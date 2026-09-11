import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theGitStoreHasNoRoomToRepackTheRepositoryItHolds = {
  id: "01a08dce-22ef-794a-a82e-b1e0e090651f",
  type: "finding",
  slug: "the-git-store-has-no-room-to-repack-the-repository-it-holds",
  domain: "domain/git-transport",
  claim:
    "The volume the transport serves the repositories out of is 4.6G, and the akasha repository alone packs to 1.6G, so a repack needs 1.6G of room beside the 3.2G of packs already there and 4.6G does not hold both. Nothing consolidates the packs now, and they grow by a pack on every push.",
  evidence:
    "On 2026-09-10 every push to origin was refused with `remote unpack failed: unable to create temporary object directory`. `/dev/sdb2`, mounted at `/data/git/repositories`, was 4.6G and full. The whole of it was `alan/akasha.git/objects/pack`, holding 52 packs over 3.2G and one 1.4G file named `tmp_pack_cg2m1y`, which `git count-objects -v` calls garbage. Removing that file freed 1.4G and the push went through. The next push left another 1.4G `tmp_pack_` behind and filled the volume again. `receive.autogc` defaults to true, `gc.autoPackLimit` to 50, and the repository had passed 50 packs, so every push ran a full repack, ran out of room part way, and left its part-written pack behind. `receive.autogc` is now false on all seven repositories, which stops the spiral but leaves nothing packing them. Packing the repository by hand answers 1,490,424 objects in a 1.6G pack. The volume is a local PV at `/var/mnt/git-transport` on node-03.",
} as const satisfies Finding
