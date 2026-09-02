"use client"

import { Badge } from "@akasha/design-badges/badge"
import { EditableNumber } from "@akasha/design-forms/editable-number"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { ALL_STOCKED_OPTIONS } from "@akasha/temper-items-rules-core/all-stocked-filter"
import { KEEP_QUANTITY_OPTIONS } from "@akasha/temper-items-rules-core/keep-quantity-filter"
import { STOCK_THRESHOLD_OPTIONS } from "@akasha/temper-items-rules-core/stock-threshold-filter"
import { TARGET_QUANTITY_OPTIONS } from "@akasha/temper-items-rules-core/target-quantity-filter"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { ReactNode } from "react"
import { ComparisonOpPicker } from "../comparison-op-picker/comparison-op-picker.module.code.tsx"
import { EditableTextValue } from "../rule-card-filter-text/rule-card-filter-text.module.code.tsx"
import type { useRuleCard } from "../use-rule-card/use-rule-card.module.code.ts"

type RuleCardState = ReturnType<typeof useRuleCard>

export type QuantityFilterId =
  | "all-stocked"
  | "stock-threshold"
  | "value"
  | "market-value"
  | "merchant-value"
  | "replacement-value"
  | "keep-quantity"
  | "target-quantity"
  | "item-name"

interface RuleCardFilterChipQuantityProps {
  id: QuantityFilterId
  state: Pick<
    RuleCardState,
    | "allStockedValue"
    | "stockThresholdValue"
    | "valueValue"
    | "valueOp"
    | "marketValueValue"
    | "marketValueOp"
    | "merchantValueValue"
    | "merchantValueOp"
    | "replacementValueValue"
    | "replacementValueOp"
    | "keepQuantityValue"
    | "targetQuantityValue"
    | "itemNamePatternValue"
    | "handleAllStockedChange"
    | "handleStockThresholdChange"
    | "handleValueChange"
    | "handleValueOpChange"
    | "handleMarketValueChange"
    | "handleMarketValueOpChange"
    | "handleMerchantValueChange"
    | "handleMerchantValueOpChange"
    | "handleReplacementValueChange"
    | "handleReplacementValueOpChange"
    | "handleKeepQuantityChange"
    | "handleTargetQuantityChange"
    | "handleItemNamePatternChange"
    | "handleRemoveFilter"
  >
}

export function RuleCardFilterChipQuantity({
  id,
  state,
}: RuleCardFilterChipQuantityProps): ReactNode {
  const {
    allStockedValue,
    stockThresholdValue,
    valueValue,
    valueOp,
    marketValueValue,
    marketValueOp,
    merchantValueValue,
    merchantValueOp,
    replacementValueValue,
    replacementValueOp,
    keepQuantityValue,
    targetQuantityValue,
    itemNamePatternValue,
    handleAllStockedChange,
    handleStockThresholdChange,
    handleValueChange,
    handleValueOpChange,
    handleMarketValueChange,
    handleMarketValueOpChange,
    handleMerchantValueChange,
    handleMerchantValueOpChange,
    handleReplacementValueChange,
    handleReplacementValueOpChange,
    handleKeepQuantityChange,
    handleTargetQuantityChange,
    handleItemNamePatternChange,
    handleRemoveFilter,
  } = state

  switch (id) {
    case "all-stocked":
      return (
        <Select value={allStockedValue} onValueChange={handleAllStockedChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("all-stocked")}
              removeLabel="Remove all stocked filter"
            >
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {ALL_STOCKED_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "stock-threshold":
      return (
        <Select value={stockThresholdValue} onValueChange={handleStockThresholdChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("stock-threshold")}
              removeLabel="Remove stock threshold filter"
            >
              Stock <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {STOCK_THRESHOLD_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={<ComparisonOpPicker value={valueOp} onChange={handleValueOpChange} />}
          onRemove={() => handleRemoveFilter("value")}
          removeLabel="Remove value filter"
        >
          <EditableNumber
            value={Number(valueValue)}
            max={99_999_999}
            suffix="g"
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleValueChange(String(n))}
          />{" "}
          Value
        </Badge>
      )

    case "market-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker value={marketValueOp} onChange={handleMarketValueOpChange} />
          }
          onRemove={() => handleRemoveFilter("market-value")}
          removeLabel="Remove market value filter"
        >
          <EditableNumber
            value={Number(marketValueValue)}
            max={99_999_999}
            suffix="g"
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleMarketValueChange(String(n))}
          />{" "}
          Market Value
        </Badge>
      )

    case "merchant-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker value={merchantValueOp} onChange={handleMerchantValueOpChange} />
          }
          onRemove={() => handleRemoveFilter("merchant-value")}
          removeLabel="Remove merchant value filter"
        >
          <EditableNumber
            value={Number(merchantValueValue)}
            max={99_999_999}
            suffix="g"
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleMerchantValueChange(String(n))}
          />{" "}
          Merchant Value
        </Badge>
      )

    case "replacement-value":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          frontAction={
            <ComparisonOpPicker
              value={replacementValueOp}
              onChange={handleReplacementValueOpChange}
            />
          }
          onRemove={() => handleRemoveFilter("replacement-value")}
          removeLabel="Remove replacement value filter"
        >
          <EditableNumber
            value={Number(replacementValueValue)}
            max={99_999_999}
            suffix="g"
            format={(n) => n.toLocaleString("en-US")}
            onChange={(n) => handleReplacementValueChange(String(n))}
          />{" "}
          Replacement Value
        </Badge>
      )

    case "keep-quantity":
      return (
        <Select value={keepQuantityValue} onValueChange={handleKeepQuantityChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("keep-quantity")}
              removeLabel="Remove keep quantity filter"
            >
              Keep <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {KEEP_QUANTITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "target-quantity":
      return (
        <Select value={targetQuantityValue} onValueChange={handleTargetQuantityChange}>
          <SelectTrigger hideChevron>
            <Badge
              variant="elevation-muted"
              className="shrink-0"
              onRemove={() => handleRemoveFilter("target-quantity")}
              removeLabel="Remove target quantity filter"
            >
              Target <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            {TARGET_QUANTITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case "item-name":
      return (
        <Badge
          variant="elevation-muted"
          className="shrink-0"
          onRemove={() => handleRemoveFilter("item-name")}
          removeLabel="Remove item name filter"
        >
          <EditableTextValue value={itemNamePatternValue} onChange={handleItemNamePatternChange} />
        </Badge>
      )
    default:
      return assertNever(id)
  }
}
