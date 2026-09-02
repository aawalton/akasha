"use client"

import { ListContentSkeleton } from "@akasha/design-layout/list-content-skeleton"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { LayoutLink } from "@akasha/design-layout/router-context"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { Button } from "@akasha/design-primitives/button"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { partitionUnmanagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { lookupCurrencyConversionRates } from "@akasha/temper-trading-pricing/currency-price-lookup"
import { Package } from "lucide-react"
import { useMemo } from "react"
import { useInventory, usePriceExtract } from "../hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "../hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { InventoryByLocationTab } from "../inventory-by-location-tab/inventory-by-location-tab.module.code.tsx"
import { InventoryFilterBar } from "../inventory-filter-bar/inventory-filter-bar.module.code.tsx"
import type {
  FilterValues,
  SortField,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import {
  resolvePricingRegion,
  resolvePricingRegionNote,
} from "../pricing-region/pricing-region.module.code.ts"
import { PricingRegionNote } from "../pricing-region-note/pricing-region-note.module.code.tsx"
import { resolvePricingSourceNote } from "../pricing-source/pricing-source.module.code.ts"
import { PricingSourceNote } from "../pricing-source-note/pricing-source-note.module.code.tsx"

interface InventoryLocationDataContentProps {
  search: string
  qualities: readonly number[]
  onSearchChange: (search: string) => void
  onQualitiesChange: (qualities: readonly number[]) => void
  armorTraits: readonly string[]
  onArmorTraitsChange: (traits: readonly string[]) => void
  weaponTraits: readonly string[]
  onWeaponTraitsChange: (traits: readonly string[]) => void
  jewelryTraits: readonly string[]
  onJewelryTraitsChange: (traits: readonly string[]) => void
  companionTraits: readonly string[]
  onCompanionTraitsChange: (traits: readonly string[]) => void
  sortBy: SortField
  sortDirection: SortDirection
  onSortChange: (sortBy: SortField, sortDirection: SortDirection) => void
  onClearFilters: () => void
  deferred: FilterValues
}

export function InventoryLocationDataContent({
  search,
  qualities,
  onSearchChange,
  onQualitiesChange,
  armorTraits,
  onArmorTraitsChange,
  weaponTraits,
  onWeaponTraitsChange,
  jewelryTraits,
  onJewelryTraitsChange,
  companionTraits,
  onCompanionTraitsChange,
  sortBy,
  sortDirection,
  onSortChange,
  onClearFilters,
  deferred,
}: InventoryLocationDataContentProps) {
  const userId = useUserId()
  const { isLoading: playerLoading, profileMetadata } = usePlayer()
  const { inventory: rawInventory, isLoading } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const pricingRegion = resolvePricingRegion(profileMetadata)
  const {
    pricing: currencyPricing,
    isLoading: pricingLoading,
    error: pricingError,
  } = usePriceExtract("currency-items", pricingRegion.platform, pricingRegion.server)

  const { inventory, excluded } = useMemo(
    () =>
      rawInventory
        ? partitionUnmanagedGuildBanks(rawInventory, managedSet)
        : { inventory: null, excluded: [] },
    [rawInventory, managedSet]
  )

  const conversionRates = useMemo(() => {
    if (!currencyPricing) return undefined
    return lookupCurrencyConversionRates(currencyPricing)
  }, [currencyPricing])

  const allTraits = useMemo(
    () => [
      ...deferred.armorTraits,
      ...deferred.weaponTraits,
      ...deferred.jewelryTraits,
      ...deferred.companionTraits,
    ],
    [deferred.armorTraits, deferred.weaponTraits, deferred.jewelryTraits, deferred.companionTraits]
  )

  const hasActiveFilters =
    search.length > 0 ||
    qualities.length > 0 ||
    allTraits.length > 0 ||
    sortBy !== "name" ||
    sortDirection !== "asc"

  const filterBar = (
    <InventoryFilterBar
      search={search}
      onSearchChange={onSearchChange}
      qualities={qualities}
      onQualitiesChange={onQualitiesChange}
      armorTraits={armorTraits}
      onArmorTraitsChange={onArmorTraitsChange}
      weaponTraits={weaponTraits}
      onWeaponTraitsChange={onWeaponTraitsChange}
      jewelryTraits={jewelryTraits}
      onJewelryTraitsChange={onJewelryTraitsChange}
      companionTraits={companionTraits}
      onCompanionTraitsChange={onCompanionTraitsChange}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSortChange={onSortChange}
      hasActiveFilters={hasActiveFilters}
      onReset={onClearFilters}
    />
  )

  const pricingHints = (
    <>
      <PricingRegionNote
        kind={resolvePricingRegionNote({
          playerSettled: !playerLoading,
          isDefaulted: pricingRegion.isDefaulted,
          pricing: currencyPricing,
          isLoading: pricingLoading,
          error: pricingError,
        })}
        platform={pricingRegion.platform}
        server={pricingRegion.server}
      />
      <PricingSourceNote
        kind={resolvePricingSourceNote({
          inventory: inventory ?? null,
          isSettled: !isLoading,
        })}
      />
    </>
  )

  if (isLoading) return <ListContentSkeleton />

  if (!inventory) {
    return (
      <div className="flex flex-col gap-6">
        <PageTabHeader title="By Location" subtitle={pricingHints}>
          {filterBar}
        </PageTabHeader>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>No inventory data</EmptyTitle>
            <EmptyDescription>
              No inventory has reached this page for your account. Inventory comes from the file the
              TemperInventory add-on writes while you play — the Watcher syncs that file for you, or
              you can upload it by hand.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild variant="accent">
              <LayoutLink href="/watcher">Check sync status</LayoutLink>
            </Button>
            <Button asChild variant="secondary">
              <LayoutLink href="/import">Go to Import</LayoutLink>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTabHeader title="By Location" subtitle={pricingHints}>
        {filterBar}
      </PageTabHeader>
      <InventoryByLocationTab
        inventory={inventory}
        excluded={excluded}
        currencies={inventory.currencies}
        conversionRates={conversionRates}
        search={deferred.search}
        qualities={deferred.qualities}
        traits={allTraits}
        sortBy={deferred.sortBy}
        sortDirection={deferred.sortDirection}
        onClearFilters={onClearFilters}
      />
    </div>
  )
}
