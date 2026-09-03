import { PageLayoutSkeleton } from "@akasha/design-layout/page-layout"
import { tabbedPageSkeleton } from "@akasha/design-layout/skeleton-presets"
import { InventoryPageContent } from "@akasha/temper-player-inventory-management-ui/inventory-page-content"
import { Suspense } from "react"
import { useSearchParams } from "react-router"
import { tabDefaultFor } from "../tab-defaults/tab-defaults.module.code.ts"

export function meta() {
  return [{ title: "Temper | Inventory" }]
}

export default function InventoryPage() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get("tab") ?? tabDefaultFor("/inventory") ?? "rules"
  return (
    <Suspense
      fallback={
        <PageLayoutSkeleton
          config={tabbedPageSkeleton({
            initialTab: tab,
            defaultTab: "rules",
            tabs: ["rules", "type", "location"],
            titleWidth: 144,
          })}
        />
      }
    >
      <InventoryPageContent
        initialTab={tab}
        initialSearch={searchParams.get("q") ?? undefined}
        initialSort={searchParams.get("sort") ?? undefined}
        initialDirection={searchParams.get("dir") ?? undefined}
        initialQuality={searchParams.get("quality") ?? undefined}
        initialArmorTrait={searchParams.get("at") ?? undefined}
        initialWeaponTrait={searchParams.get("wt") ?? undefined}
        initialJewelryTrait={searchParams.get("jt") ?? undefined}
        initialCompanionTrait={searchParams.get("ct") ?? undefined}
        initialStatus={searchParams.get("status") ?? undefined}
        initialLock={searchParams.get("lock") ?? undefined}
        initialGoal={searchParams.get("goal") ?? undefined}
        initialAction={searchParams.get("action") ?? undefined}
        initialRuleCategory={searchParams.get("rcat") ?? undefined}
        initialRuleSearch={searchParams.get("rq") ?? undefined}
        initialRuleSort={searchParams.get("rsort") ?? undefined}
        initialRuleDir={searchParams.get("rdir") ?? undefined}
        initialRuleLocation={searchParams.get("rloc") ?? undefined}
      />
    </Suspense>
  )
}
