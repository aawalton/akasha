import type { Finding } from "../finding.page-type.ts"

export const sixCaptureHostsRecreateAsSixPackagesOfOneModule = {
  id: "01a0607e-a957-79ca-9276-c56108e63505",
  pageTypeSlug: "finding",
  slug: "six-capture-hosts-recreate-as-six-packages-of-one-module",
  domainSlug: "domain/temper",
  claim:
    "The six game capture hosts were recreated one for one, so five of them are a workspace package holding a single module. Their payload types already sit together in `temper-capture-shapes` as one package of nineteen modules, and these are the zod readers for ten of those same shapes. One package mirroring `temper-capture-shapes` module for module would say the same thing in one manifest rather than six. The one-for-one shape was taken to keep each teardown provable on its own.",
  evidence:
    "What landed, with the module each package holds:\n\n- `temper-game-collections-antiquities-capture-host` — `antiquity-lore-catalog-schema`\n- `temper-game-collections-capture-host` — `collectibles-catalog-schema`\n- `temper-game-collections-lore-capture-host` — `lore-library-catalog-schema`\n- `temper-game-collections-tribute-capture-host` — `tribute-catalog-schema`\n- `temper-game-completion-capture-host` — `achievement-catalog-schema`, `cadwell-catalog-schema`, `zone-completion-catalog-schema`\n- `temper-game-crafting-capture-host` — `recipe-catalog-schema`, `trait-research-catalog-schema`\n\nTen modules across six packages. Every module imports its payload type from `@akasha/temper-capture-shapes`, which holds nineteen modules in one package under one manifest.\n\nThe largest of the ten code files is 1,151 bytes and the smallest is 443. The six manifests together are larger than several of the modules they declare.\n\nTwo reasons the merge was not taken. `temper/game-navigation-capture-host` is the seventh of the set and belongs to another seat, so merging six of seven would leave the set half gathered. And each source package was torn down against its own recreation, which a merge would have made one large step instead of six small ones.\n\nA seat holding all seven at once can still gather them.",
} as const satisfies Finding
