import type {
  AddNode,
  ConstantNode,
  DivideNode,
  FloorNode,
  MaxNode,
  MinNode,
  MultiplyNode,
} from "@akasha/temper-formula-framework/arithmetic-node"
import type { CompanionBaseRoleId } from "../companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"

type CompanionMetricRefNode = {
  type: "metric-ref"
  metricId: CompanionMetricId
  convertRatingToChance?: boolean
}

type CompanionSumNode = {
  type: "sum"
  metricId: CompanionMetricId
  effectType: "integer" | "fractional-change"
}

type CompanionRoleSumNode = {
  type: "role-sum"
  operands: ReadonlyArray<{
    role: CompanionBaseRoleId
    metricRef: CompanionMetricId
    scale?: number
  }>
}

type CompanionProductNode = {
  type: "product"
  metricId: CompanionMetricId
  effectType: "fractional-change"
}

export type CompanionFormulaNode =
  | ConstantNode
  | AddNode<CompanionFormulaNode>
  | MultiplyNode<CompanionFormulaNode>
  | DivideNode<CompanionFormulaNode>
  | FloorNode<CompanionFormulaNode>
  | MaxNode<CompanionFormulaNode>
  | MinNode<CompanionFormulaNode>
  | CompanionMetricRefNode
  | CompanionSumNode
  | CompanionRoleSumNode
  | CompanionProductNode

interface CompanionMetricBase {
  id: CompanionMetricId
  name: string
  effectType?: "fractional-change" | "integer"
  formula?: CompanionFormulaNode
}

interface CompanionMetricRating extends CompanionMetricBase {
  valueType: "rating"
  divisor: number
  cap: number
  ratingFloorIncrement?: number
}

interface CompanionMetricNonRating extends CompanionMetricBase {
  valueType: "fractional-change" | "integer"
  divisor?: never
  cap?: never
  ratingFloorIncrement?: never
}

export type CompanionMetricTemplate = CompanionMetricRating | CompanionMetricNonRating
