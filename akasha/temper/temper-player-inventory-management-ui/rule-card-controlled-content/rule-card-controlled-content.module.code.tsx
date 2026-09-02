"use client"

import { Badge } from "@akasha/design-badges/badge"
import type { ControlledRule } from "@akasha/temper-items-rules-core/inventory-rule-controlled"
import type { CategoryRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ChevronRight } from "lucide-react"
import { ControlledRuleConditions } from "../rule-card-controlled-conditions/rule-card-controlled-conditions.module.code.tsx"
import { formatDestination } from "../rule-card-destination-format/rule-card-destination-format.module.code.ts"

interface RuleCardControlledContentProps {
  rule: CategoryRule
  actionLabel: string
  path: readonly { id: string; name: string }[]
  controlled: ControlledRule
}

export function RuleCardControlledContent({
  rule,
  actionLabel,
  path,
  controlled,
}: RuleCardControlledContentProps) {
  return (
    <div inert className="flex flex-col gap-1.5">
      {}
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="green" className="shrink-0">
          {actionLabel}
        </Badge>
        {rule.destination != null && (
          <>
            <ChevronRight className="size-3 text-tertiary" />
            <Badge variant="elevation-muted" className="shrink-0">
              {formatDestination(rule.destination)}
            </Badge>
          </>
        )}
        {rule.stockScope != null && rule.action === "stock" && (
          <>
            <ChevronRight className="size-3 text-tertiary" />
            <Badge variant="elevation-muted" className="shrink-0">
              {rule.stockScope === "any-character" ? "Any Character" : "Current Character"}
            </Badge>
          </>
        )}
      </div>

      {}
      {path.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {path.map((node, i) => (
            <div key={node.id} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="size-3 text-tertiary" />}
              <Badge variant="elevation-muted" className="shrink-0">
                {node.name}
              </Badge>
            </div>
          ))}
          {controlled.displayCategoryLabel != null && (
            <div className="flex items-center gap-1">
              <ChevronRight className="size-3 text-tertiary" />
              <Badge variant="elevation-muted" className="shrink-0">
                {controlled.displayCategoryLabel}
              </Badge>
            </div>
          )}
        </div>
      )}

      {}
      {rule.conditions && <ControlledRuleConditions conditions={rule.conditions} />}
    </div>
  )
}
