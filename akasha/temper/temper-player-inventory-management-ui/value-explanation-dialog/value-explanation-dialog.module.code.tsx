"use client"

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@akasha/design-primitives/dialog"
import { formatGold } from "@akasha/design-primitives/format-gold"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"

export interface ValueExplanationData {
  itemName: string
  marketValue?: number
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
}

interface ValueExplanationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: ValueExplanationData | null
}

function formatNumber(value: number): string {
  return value.toLocaleString()
}

export function ValueExplanationDialog({ open, onOpenChange, data }: ValueExplanationDialogProps) {
  const surface = useSurface()
  if (!data) return null

  const ev = data.marketValue
  const rc = data.replacementValue
  const mv = data.merchantValue
  const displayValue =
    ev !== undefined || mv !== undefined || rc !== undefined
      ? Math.max(ev ?? 0, mv ?? 0, rc ?? 0)
      : undefined
  const source: "market" | "replacement" | "merchant" =
    displayValue !== undefined
      ? rc !== undefined && rc >= (ev ?? 0) && rc >= (mv ?? 0)
        ? "replacement"
        : mv !== undefined && (ev === undefined || mv > ev)
          ? "merchant"
          : "market"
      : "market"

  const suggested = data.suggestedPrice
  const sa = data.saleAvg
  const n = data.minPrice
  const ac = data.amountCount
  const sac = data.saleAmountCount
  const hasListingData = suggested !== undefined || sa !== undefined || n !== undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{data.itemName}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="space-y-2">
            <Text className="font-medium text-primary text-sm">Value Sources</Text>
            <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
              <table className="w-full text-sm">
                <tbody>
                  {displayValue !== undefined && (
                    <Row label="Value" value={formatGold(displayValue)} active />
                  )}
                  <Row
                    label="Market Value"
                    value={ev !== undefined ? formatGold(ev) : "—"}
                    active={source === "market" && displayValue !== undefined}
                  />
                  <Row
                    label="Replacement Value"
                    value={rc !== undefined ? formatGold(rc) : "—"}
                    active={source === "replacement" && displayValue !== undefined}
                  />
                  <Row
                    label="Merchant Value"
                    value={mv !== undefined ? formatGold(mv) : "—"}
                    active={source === "merchant" && displayValue !== undefined}
                  />
                </tbody>
              </table>
            </div>
          </div>

          {hasListingData && (
            <div className="space-y-2">
              <Text className="font-medium text-primary text-sm">Listing Summary</Text>
              <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
                <table className="w-full text-sm">
                  <tbody>
                    <Row
                      label="Suggested Price"
                      value={suggested !== undefined ? formatGold(suggested) : "—"}
                    />
                    <Row label="Sale Average" value={sa !== undefined ? formatGold(sa) : "—"} />
                    <Row label="Min Listing" value={n !== undefined ? formatGold(n) : "—"} />
                    <Row
                      label="Listed Quantity"
                      value={ac !== undefined ? formatNumber(ac) : "—"}
                    />
                    <Row
                      label="Sold Quantity"
                      value={sac !== undefined ? formatNumber(sac) : "—"}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {}
          <div className="space-y-2">
            <Text className="font-medium text-primary text-sm">Market Value Basis</Text>
            <div className={`rounded-md ${surfaceClass(surface + 1)} p-3`}>
              {suggested !== undefined ? (
                <Text className="text-tertiary text-xs">
                  Using TTC suggested price ({formatGold(suggested)}).
                </Text>
              ) : sa !== undefined ? (
                <Text className="text-tertiary text-xs">
                  No TTC suggested price — using sale average ({formatGold(sa)}).
                </Text>
              ) : n !== undefined ? (
                <Text className="text-tertiary text-xs">
                  No usable market price — TTC lists a minimum of {formatGold(n)} but no suggested
                  price or sale average, and those are the only two Temper values items from.
                </Text>
              ) : (
                <Text className="text-tertiary text-xs">
                  No market price for this item — Temper has no Tamriel Trade Centre data for it.
                </Text>
              )}
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function Row({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <tr>
      <td className="py-0.5 text-secondary text-sm">{label}</td>
      <td
        className={`py-0.5 text-right font-mono text-sm ${active ? "font-semibold text-accent" : "text-primary"}`}
      >
        {value}
      </td>
    </tr>
  )
}
