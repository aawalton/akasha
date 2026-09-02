import { requireFirst } from "@akasha/utils-narrow/require-first"
import type { DisplayFormulaNode } from "../display-formula-node/display-formula-node.module.code.ts"

export interface DisplayResult {
  node: DisplayFormulaNode
  value: number
}

type ArithmeticType = "constant" | "add" | "multiply" | "divide" | "floor" | "max" | "min"

const ARITHMETIC_TYPES = new Set<string>([
  "constant",
  "add",
  "multiply",
  "divide",
  "floor",
  "max",
  "min",
])

function isArithmeticNode<TNode>(node: TNode): node is TNode & { type: ArithmeticType } {
  if (typeof node !== "object" || node === null || !("type" in node)) {
    return false
  }
  const { type } = node
  return typeof type === "string" && ARITHMETIC_TYPES.has(type)
}

function isConstantNode<TNode>(node: TNode): node is TNode & { type: "constant"; value: number } {
  if (typeof node !== "object" || node === null) {
    return false
  }
  if (!("type" in node) || node.type !== "constant") {
    return false
  }
  return "value" in node && typeof node.value === "number"
}

function isOperandsNode<TNode, K extends string>(
  node: TNode,
  kind: K
): node is TNode & { type: K; operands: TNode[] } {
  if (typeof node !== "object" || node === null) {
    return false
  }
  if (!("type" in node) || node.type !== kind) {
    return false
  }
  return "operands" in node && Array.isArray(node.operands)
}

function isFloorNode<TNode>(node: TNode): node is TNode & { type: "floor"; operand: TNode } {
  if (typeof node !== "object" || node === null) {
    return false
  }
  if (!("type" in node) || node.type !== "floor") {
    return false
  }
  return "operand" in node
}

export function convertArithmeticToDisplay<TNode>(
  node: TNode,
  convertLeaf: (node: TNode) => DisplayResult
): DisplayResult {
  if (!isArithmeticNode(node)) {
    return convertLeaf(node)
  }

  if (isConstantNode(node)) {
    return {
      node: { type: "constant", value: node.value },
      value: node.value,
    }
  }

  if (isOperandsNode(node, "add")) {
    const results = node.operands.map((op) => convertArithmeticToDisplay(op, convertLeaf))
    const nonZero = results.filter((r) => r.value !== 0)

    if (nonZero.length === 0) {
      return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
    }

    if (nonZero.length === 1) {
      return requireFirst(nonZero, "add nonZero")
    }

    const total = results.reduce((sum, r) => sum + r.value, 0)
    return {
      node: { type: "add", operands: nonZero.map((r) => r.node) },
      value: total,
    }
  }

  if (isOperandsNode(node, "multiply")) {
    const results = node.operands.map((op) => convertArithmeticToDisplay(op, convertLeaf))
    const nonIdentity = results.filter((r) => r.value !== 1)

    if (nonIdentity.length === 0) {
      return { node: { type: "constant", value: 1 }, value: 1 }
    }

    if (nonIdentity.length === 1) {
      return requireFirst(nonIdentity, "multiply nonIdentity")
    }

    const product = results.reduce((p, r) => p * r.value, 1)
    return {
      node: { type: "multiply", operands: nonIdentity.map((r) => r.node) },
      value: product,
    }
  }

  if (isOperandsNode(node, "divide")) {
    if (node.operands.length === 0) {
      return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
    }

    const results = node.operands.map((op) => convertArithmeticToDisplay(op, convertLeaf))

    if (results.length === 1) {
      return requireFirst(results, "divide results")
    }

    const first = requireFirst(results, "divide results")
    let value = first.value
    let current: DisplayFormulaNode = first.node
    let isFirst = true
    for (const next of results) {
      if (isFirst) {
        isFirst = false
        continue
      }
      if (next.value !== 0) {
        value = value / next.value
      }
      current = { type: "divide", numerator: current, denominator: next.node }
    }

    return { node: current, value }
  }

  if (isFloorNode(node)) {
    const result = convertArithmeticToDisplay(node.operand, convertLeaf)
    const floored = Math.floor(result.value)

    if (floored === result.value) {
      return result
    }

    return {
      node: { type: "floor", operand: result.node },
      value: floored,
    }
  }

  if (isOperandsNode(node, "max")) {
    if (node.operands.length === 0) {
      return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
    }

    const results = node.operands.map((op) => convertArithmeticToDisplay(op, convertLeaf))

    if (results.length === 1) {
      return requireFirst(results, "max results")
    }

    const maxValue = Math.max(...results.map((r) => r.value))
    return {
      node: { type: "max", operands: results.map((r) => r.node) },
      value: maxValue,
    }
  }

  if (isOperandsNode(node, "min")) {
    if (node.operands.length === 0) {
      return { node: { type: "constant", value: 0, format: "integer" }, value: 0 }
    }

    const results = node.operands.map((op) => convertArithmeticToDisplay(op, convertLeaf))

    if (results.length === 1) {
      return requireFirst(results, "min results")
    }

    const minValue = Math.min(...results.map((r) => r.value))
    return {
      node: { type: "min", operands: results.map((r) => r.node) },
      value: minValue,
    }
  }

  return convertLeaf(node)
}
