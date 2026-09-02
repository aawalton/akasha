import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  DisplayFormulaNode,
  NumberFormat,
} from "../display-formula-node/display-formula-node.module.code.ts"

function formatNumber(value: number, format: NumberFormat = "decimal"): string {
  switch (format) {
    case "integer":
      return Math.round(value).toLocaleString()
    case "percent": {
      const pct = value * 100
      return `${pct.toFixed(2).replace(/\.?0+$/, "")}%`
    }
    case "decimal": {
      if (value === 0) return "0"
      if (Math.abs(value) < 1) {
        return value.toFixed(4).replace(/\.?0+$/, "")
      }
      return Math.round(value).toLocaleString()
    }
    default:
      return assertNever(format)
  }
}

type ParentContext = "root" | "add" | "multiply" | "divide" | "floor" | "max" | "min" | "group"

function nodeToText(node: DisplayFormulaNode, parent: ParentContext): string {
  switch (node.type) {
    case "constant":
      return formatNumber(node.value, node.format)

    case "variable":
      return `[${node.label}]`

    case "labeled-value":
      return `${formatNumber(node.value, node.format)} ${node.label}`

    case "add": {
      const inner = node.operands.map((op) => nodeToText(op, "add")).join(" + ")
      if (parent === "multiply") {
        return `(${inner})`
      }
      return inner
    }

    case "multiply": {
      const parts = node.operands.map((op) => nodeToText(op, "multiply"))
      return parts.join(" × ")
    }

    case "divide":
      return `${nodeToText(node.numerator, "divide")} / ${nodeToText(node.denominator, "divide")}`

    case "floor":
      return `floor(${nodeToText(node.operand, "floor")})`

    case "max": {
      const args = node.operands.map((op) => nodeToText(op, "max")).join(", ")
      return `max(${args})`
    }

    case "min": {
      const args = node.operands.map((op) => nodeToText(op, "min")).join(", ")
      return `min(${args})`
    }

    case "equals":
      return `${nodeToText(node.left, "root")} = ${nodeToText(node.right, "root")}`

    case "group":
      return `(${nodeToText(node.operand, "group")})`

    default:
      return assertNever(node)
  }
}

export function toPlainText(node: DisplayFormulaNode): string {
  return nodeToText(node, "root")
}
