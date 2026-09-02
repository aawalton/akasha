"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { LayoutLink } from "@akasha/design-layout/router-context"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import { Skeleton } from "@akasha/design-primitives/skeleton"
import { Switch } from "@akasha/design-primitives/switch-control"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { extractGuildBankKeys } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { useInventory } from "@akasha/temper-player-inventory-management-ui/hooks-inventory"
import { useManagedGuildBanks } from "@akasha/temper-player-inventory-management-ui/hooks-inventory-settings"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { AlertCircle, Package } from "lucide-react"
import { useMemo } from "react"
import {
  type GuildBankListState,
  resolveGuildBankListState,
} from "../guild-bank-list-state/guild-bank-list-state.module.code.ts"

interface InventoryTabProps {
  active: boolean
}

export function InventoryTab({ active }: InventoryTabProps) {
  const userId = useUserId()
  const { inventory, isLoading, isError, dataTimestamp } = useInventory(userId)
  const { managedSet, updateManagedGuildBanks } = useManagedGuildBanks()

  const guildBanks = useMemo(() => (inventory ? extractGuildBankKeys(inventory) : []), [inventory])

  const state = resolveGuildBankListState({
    isLoading,
    isError,
    hasSnapshot: dataTimestamp !== null,
    hasInventory: inventory !== null,
    guildBankCount: guildBanks.length,
  })

  if (!active) return null

  function handleToggle(key: string, checked: boolean) {
    const next = checked ? [...managedSet, key] : [...managedSet].filter((k) => k !== key)
    updateManagedGuildBanks(next)
  }

  return (
    <ResponsiveColumns>
      <InputPanelCard id="managed-guild-banks" title="Managed Guild Banks">
        {state === "ready" ? (
          guildBanks.map((gb) => (
            <InputPanelCard.Row key={gb.key} label={gb.displayName}>
              <div className="flex h-9 items-center">
                <Switch
                  checked={managedSet.has(gb.key)}
                  onCheckedChange={(checked) => handleToggle(gb.key, checked)}
                />
              </div>
            </InputPanelCard.Row>
          ))
        ) : (
          <GuildBankListPlaceholder state={state} />
        )}
      </InputPanelCard>
    </ResponsiveColumns>
  )
}

function GuildBankListPlaceholder({ state }: { state: Exclude<GuildBankListState, "ready"> }) {
  switch (state) {
    case "loading":
      return (
        <div className="space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      )
    case "load-failed":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>Couldn't load your inventory</EmptyTitle>
            <EmptyDescription>
              Temper could not read your inventory data just now, so it cannot tell which guild
              banks you have. This is a fault on Temper's side — not your game, and not your
              add-ons. Reloading the page will try again.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "data-unreadable":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle />
            </EmptyMedia>
            <EmptyTitle>Your inventory data could not be read</EmptyTitle>
            <EmptyDescription>
              Temper has an inventory snapshot for this account but could not reassemble it, so it
              cannot tell which guild banks are in it. The data arrived — reading it is what failed,
              which is Temper's fault rather than your game's. A fresh sync will replace the
              snapshot.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "no-inventory-data":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>No inventory data yet</EmptyTitle>
            <EmptyDescription>
              Temper has not received any inventory data for this account, so it has nothing to list
              here yet. Inventory reaches Temper through the{" "}
              <LayoutLink href="/watcher" className="text-accent hover:underline">
                Watcher
              </LayoutLink>{" "}
              or the{" "}
              <LayoutLink href="/import" className="text-accent hover:underline">
                Import
              </LayoutLink>{" "}
              page.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    case "no-guild-banks":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>No guild banks in your inventory data</EmptyTitle>
            <EmptyDescription>
              Your inventory data reached Temper and contains no guild banks. TemperInventory can
              only record a guild bank once you have opened it in game, so a bank you have not
              opened since installing the add-on will not be here yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
    default:
      return assertNever(state)
  }
}
