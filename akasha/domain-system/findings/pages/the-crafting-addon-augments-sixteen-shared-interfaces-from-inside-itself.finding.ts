import type { Finding } from "../finding.page-type.ts"

export const theCraftingAddonAugmentsSixteenSharedInterfacesFromInsideItself = {
  id: "01a061cc-a0b1-7637-8348-5555e274a779",
  pageTypeSlug: "finding",
  slug: "the-crafting-addon-augments-sixteen-shared-interfaces-from-inside-itself",
  domainSlug: "domain/temper",
  claim:
    "The crafting recreation adds 57 members to 16 interfaces the shared type sets own, and it adds them from a private `declare global` inside the add-on rather than in `temper-eso-types` or `temper-addon-library-types`. A global augmentation is tree-wide once compiled, so every other package silently gains those members from a package it does not depend on, and a seat later adding the same member with a different signature breaks the tree rather than this add-on.",
  evidence:
    "The 16 are Control, ButtonControl, TooltipControl, ObjectPool, SceneManager, ZO_Animation, MailInbox, InventorySlotData, InventoryRowSlotData, PlayerInventoryDefinition, PlayerInventoryManager, CenterScreenAnnounceMessageParams, LamEditboxControl, FcoisApi, MasterMerchantApi and TamrielTradeCentrePriceApi. Each adds members the shared set does not hold: Control gains SetInheritScale, SetSimpleAnchorParent, EnableMouseButton and the add-on's own data, checkState and tristate; TooltipControl gains AddHeaderLine, SetQuestReward, SetTradeItem, SetTradingHouseListing, SetBuybackItem and SetAttachedMailItem. The move was left undone because all 19 files owning those interfaces changed in the twelve hours before this commit, and two seats were editing eso-ui and the alchemy-station declarations while this was written. Moving 57 members into 19 racing files would have repeated the tree-wide break that commit 31361d01af caused.",
} as const satisfies Finding
