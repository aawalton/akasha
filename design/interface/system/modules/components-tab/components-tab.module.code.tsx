"use client"

import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { ComponentsCompoundNavPanels } from "akasha/design/interface/system/modules/components-compound-nav-panels/components-compound-nav-panels.module.code.tsx"
import {
  CalendarPanel,
  CarouselPanel,
  CommandPanel,
  FieldPanel,
  ResizablePanelsPanel,
} from "akasha/design/interface/system/modules/components-compound-panels/components-compound-panels.module.code.tsx"
import {
  BadgesPanel,
  ButtonsPanel,
  CardsPanel,
  QualityBadgesPanel,
  RemovableBadgesPanel,
} from "akasha/design/interface/system/modules/components-core-panels/components-core-panels.module.code.tsx"
import {
  CheckboxPanel,
  ProgressPanel,
  RadioGroupPanel,
  SliderPanel,
  SwitchPanel,
  ToggleGroupPanel,
  TogglePanel,
} from "akasha/design/interface/system/modules/components-form-controls-panels/components-form-controls-panels.module.code.tsx"
import {
  EditableBadgeNumberPanel,
  InlineEditableTextPanel,
  InputGroupPanel,
  InputOTPPanel,
} from "akasha/design/interface/system/modules/components-input-composite-panels/components-input-composite-panels.module.code.tsx"
import {
  InputPanelCardPanel,
  InputsPanel,
  SelectPanel,
  TextareaPanel,
} from "akasha/design/interface/system/modules/components-input-panels/components-input-panels.module.code.tsx"
import {
  ChipListPanel,
  ChipPanel,
  HorizontalScrollFadePanel,
  ItemCardPanel,
  ItemRowPanel,
  ScrollAreaPanel,
} from "akasha/design/interface/system/modules/components-item-display-panels/components-item-display-panels.module.code.tsx"
import {
  LoadMoreButtonPanel,
  PaginatedCardGridPanel,
  VirtualCardGridPanel,
} from "akasha/design/interface/system/modules/components-list-grid-panels/components-list-grid-panels.module.code.tsx"
import {
  AlertDialogPanel,
  ContextMenuPanel,
  DrawerPanel,
  DropdownMenuPanel,
  HoverCardPanel,
} from "akasha/design/interface/system/modules/components-menu-panels/components-menu-panels.module.code.tsx"
import {
  DialogPanel,
  PopoverPanel,
  SheetPanel,
  TablePanel,
  TabsPanel,
} from "akasha/design/interface/system/modules/components-overlay-panels/components-overlay-panels.module.code.tsx"
import {
  BadgeToggleGroupPanel,
  MultiSelectPanel,
  SearchButtonPanel,
  SearchMultiSelectPanel,
} from "akasha/design/interface/system/modules/components-selection-panels/components-selection-panels.module.code.tsx"
import {
  ListContentSkeletonPanel,
  LoadingContainerPanel,
  SkeletonPanel,
  SkeletonTextPanel,
} from "akasha/design/interface/system/modules/components-skeleton-panels/components-skeleton-panels.module.code.tsx"
import {
  AddFilterButtonPanel,
  AddSortButtonPanel,
  FilterButtonPanel,
  FilterGroupPanel,
  SearchSortFilterRowComposedPanel,
  SortButtonMultiSortPanel,
  SortGroupPanel,
} from "akasha/design/interface/system/modules/components-sort-filter-panels/components-sort-filter-panels.module.code.tsx"
import {
  AlertPanel,
  AvatarPanel,
  BreadcrumbPanel,
  KbdPanel,
  SeparatorPanel,
  TextPanel,
} from "akasha/design/interface/system/modules/components-text-display-panels/components-text-display-panels.module.code.tsx"

export function ComponentsTabContent() {
  return (
    <TabsContent value="components">
      <div className="flex flex-col gap-6">
        <PageTabHeader title="Components" />
        <ResponsiveColumns>
          <ButtonsPanel />
          <BadgesPanel />
          <QualityBadgesPanel />
          <RemovableBadgesPanel />
          <CardsPanel />
          <InputsPanel />
          <InputPanelCardPanel />
          <TextareaPanel />
          <SelectPanel />
          <DialogPanel />
          <SheetPanel />
          <PopoverPanel />
          <TabsPanel />
          <TablePanel />
          <CheckboxPanel />
          <SwitchPanel />
          <RadioGroupPanel />
          <SliderPanel />
          <ProgressPanel />
          <TogglePanel />
          <ToggleGroupPanel />
          <TextPanel />
          <KbdPanel />
          <SeparatorPanel />
          <AlertPanel />
          <AvatarPanel />
          <BreadcrumbPanel />
          <SkeletonPanel />
          <SkeletonTextPanel />
          <ListContentSkeletonPanel />
          <LoadingContainerPanel />
          <DropdownMenuPanel />
          <ContextMenuPanel />
          <HoverCardPanel />
          <AlertDialogPanel />
          <DrawerPanel />
          <InputGroupPanel />
          <InputOTPPanel />
          <InlineEditableTextPanel />
          <EditableBadgeNumberPanel />
          <MultiSelectPanel />
          <SearchMultiSelectPanel />
          <BadgeToggleGroupPanel />
          <SearchButtonPanel />
          <SearchSortFilterRowComposedPanel />
          <SortButtonMultiSortPanel />
          <SortGroupPanel />
          <FilterButtonPanel />
          <AddSortButtonPanel />
          <AddFilterButtonPanel />
          <FilterGroupPanel />
          <ChipPanel />
          <ChipListPanel />
          <ItemCardPanel />
          <ItemRowPanel />
          <HorizontalScrollFadePanel />
          <ScrollAreaPanel />
          <LoadMoreButtonPanel />
          <VirtualCardGridPanel />
          <PaginatedCardGridPanel />
          <FieldPanel />
          <CalendarPanel />
          <CarouselPanel />
          <CommandPanel />
          <ResizablePanelsPanel />
          <ComponentsCompoundNavPanels />
        </ResponsiveColumns>
      </div>
    </TabsContent>
  )
}
