import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { scrollToCard } from "@akasha/design-layout/scroll-to-card"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { SubclassingSkillMorphsPanelCard } from "@akasha/temper-player-completion-skills-morphs-ui/subclassing-skill-morphs-panel-card"
import type {
  CompletionFilter,
  CompletionSortMode,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { AccountAchievementsPanelCard } from "../account-achievements-panel-card/account-achievements-panel-card.module.code.tsx"
import { AccountCollectiblesPanelCard } from "../account-collectibles-panel-card/account-collectibles-panel-card.module.code.tsx"
import { AccountPoiPanelCard } from "../account-poi-panel-card/account-poi-panel-card.module.code.tsx"
import type { AccountProgressData } from "../account-progress/account-progress.module.code.ts"
import { AccountQuestsPanelCard } from "../account-quests-panel-card/account-quests-panel-card.module.code.tsx"
import { AccountRecipesPanelCard } from "../account-recipes-panel-card/account-recipes-panel-card.module.code.tsx"
import { AccountScribingKnowledgePanelCard } from "../account-scribing-knowledge-panel-card/account-scribing-knowledge-panel-card.module.code.tsx"
import { AccountSummaryPanelCard } from "../account-summary-panel-card/account-summary-panel-card.module.code.tsx"
import { AccountTraitResearchPanelCard } from "../account-trait-research-panel-card/account-trait-research-panel-card.module.code.tsx"
import { AccountTributePanelCard } from "../account-tribute-panel-card/account-tribute-panel-card.module.code.tsx"
import { AccountZoneCompletionPanelCard } from "../account-zone-completion-panel-card/account-zone-completion-panel-card.module.code.tsx"
import { AntiquityLorePanelCard } from "../antiquity-lore-panel-card/antiquity-lore-panel-card.module.code.tsx"
import { BankUpgradesPanelCard } from "../bank-upgrades-panel-card/bank-upgrades-panel-card.module.code.tsx"
import { ChampionPointsPanelCard } from "../champion-points-panel-card/champion-points-panel-card.module.code.tsx"
import { GrandMasterStationsPanelCard } from "../grand-master-stations-panel-card/grand-master-stations-panel-card.module.code.tsx"
import { ItemSetsProgressPanelCard } from "../item-sets-progress-panel-card/item-sets-progress-panel-card.module.code.tsx"
import { LoreLibraryPanelCard } from "../lore-library-panel-card/lore-library-panel-card.module.code.tsx"
import { SubclassingSkillLinesPanelCard } from "../subclassing-skill-lines-panel-card/subclassing-skill-lines-panel-card.module.code.tsx"

interface AccountPanelGridProps {
  accountSummary: AccountSummaryData
  accountProgress: AccountProgressData
  completionFilter: CompletionFilter
  activityCategoryFilter: readonly ActivityCategoryId[]
  sortMode: CompletionSortMode
  sortDirection: SortDirection
}

export function AccountPanelGrid({
  accountSummary,
  accountProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountPanelGridProps) {
  const {
    accountAchievementProgress,
    antiquityLoreProgress,
    bankUpgrade,
    championPointsEarned,
    collectiblesProgress,
    grandMasterStations,
    recipeUnion,
    traitResearchUnion,
    itemSetProgress,
    loreProgress,
    poiUnion,
    questUnion,
    scribingUnion,
    subclassingSkillLines,
    subclassingSkillMorphs,
    tributeProgress,
    zoneCompletionUnion,
  } = accountProgress

  return (
    <ResponsiveColumns hasSummaryPanel>
      <AccountSummaryPanelCard
        summary={accountSummary}
        completionFilter={completionFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
        onItemClick={(key) => scrollToCard(String(key), false)}
        collapseProtected
      />
      <AccountAchievementsPanelCard
        id="account-achievements"
        achievementProgress={accountAchievementProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AntiquityLorePanelCard
        id="antiquity-lore"
        antiquityLoreProgress={antiquityLoreProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <BankUpgradesPanelCard
        id="bank-upgrades"
        bankUpgrade={bankUpgrade}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <ChampionPointsPanelCard
        id="champion-points"
        championPointsEarned={championPointsEarned}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountCollectiblesPanelCard
        id="collectibles"
        collectiblesProgress={collectiblesProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <GrandMasterStationsPanelCard
        id="grand-master-stations"
        grandMasterStations={grandMasterStations}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountRecipesPanelCard
        id="account-recipes"
        recipeUnion={recipeUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountTraitResearchPanelCard
        id="account-trait-research"
        traitResearchUnion={traitResearchUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <ItemSetsProgressPanelCard
        id="item-sets"
        itemSetProgress={itemSetProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <LoreLibraryPanelCard
        id="lore-library"
        loreProgress={loreProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />

      <AccountPoiPanelCard
        id="account-points-of-interest"
        poiUnion={poiUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountQuestsPanelCard
        id="account-quests"
        questUnion={questUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountScribingKnowledgePanelCard
        id="account-scribing-knowledge"
        scribingUnion={scribingUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <SubclassingSkillLinesPanelCard
        id="subclassing-skill-lines"
        subclassingSkillLines={subclassingSkillLines}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <SubclassingSkillMorphsPanelCard
        id="subclassing-skill-morphs"
        subclassingSkillMorphs={subclassingSkillMorphs}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountTributePanelCard
        id="tales-of-tribute"
        tributeProgress={tributeProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountZoneCompletionPanelCard
        id="account-zone-completion"
        zoneCompletionUnion={zoneCompletionUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    </ResponsiveColumns>
  )
}
