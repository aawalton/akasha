import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { FormulaNode } from "../formula-types/formula-types.module.code.ts"
import type { MetricValueType } from "../metric-value-types/metric-value-types.module.code.ts"

type EsoStatFields =
  | { category: "base"; esoStatConstantName: string }
  | { category: "advanced"; esoStatConstantName: string; esoStatValuePart: "flat" | "percent" }
  | { category?: "computed" | "simulated" }

interface SharedMetricFields {
  id: MetricId
  name: string
  polarity: "higher-is-better" | "lower-is-better"
  formula?: FormulaNode
  fullyImplemented: boolean
}

type BaseMetricTemplate = SharedMetricFields & EsoStatFields

type IntegerMetricTemplate = BaseMetricTemplate & {
  valueType: Extract<MetricValueType, "integer">
}

type FractionalChangeMetricTemplate = BaseMetricTemplate & {
  valueType: Extract<MetricValueType, "fractional-change">
}

type NumberPerSecondMetricTemplate = BaseMetricTemplate & {
  valueType: Extract<MetricValueType, "number-per-second">
}

type RatingMetricTemplate = BaseMetricTemplate & {
  valueType: Extract<MetricValueType, "rating">
  divisor: number
  cap?: number
}

export type MetricTemplate =
  | IntegerMetricTemplate
  | FractionalChangeMetricTemplate
  | NumberPerSecondMetricTemplate
  | RatingMetricTemplate
