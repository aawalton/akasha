import { requireFirst } from "@akasha/utils-narrow/require-first"
import type {
  ArithmeticNode,
  ConstantNode,
} from "../arithmetic-node/arithmetic-node.module.code.ts"

function isConstantNode<F>(node: ArithmeticNode<F> | F): node is ConstantNode {
  return typeof node === "object" && node !== null && "type" in node && node.type === "constant"
}

function isArithmeticNode<F>(node: F): node is F & ArithmeticNode<F> {
  if (typeof node !== "object" || node === null || !("type" in node)) {
    return false
  }
  const type = node.type
  return (
    type === "constant" ||
    type === "add" ||
    type === "multiply" ||
    type === "divide" ||
    type === "floor" ||
    type === "max" ||
    type === "min"
  )
}

export function evaluateArithmeticNode<TNode, TContext>(
  node: TNode,
  context: TContext,
  evaluateLeaf: (node: TNode, context: TContext) => number
): number {
  if (!isArithmeticNode<TNode>(node)) {
    return evaluateLeaf(node, context)
  }

  if (isConstantNode<TNode>(node)) {
    return node.value
  }

  switch (node.type) {
    case "add": {
      let result = 0
      for (const operand of node.operands) {
        result += evaluateArithmeticNode(operand, context, evaluateLeaf)
      }
      return result
    }

    case "multiply": {
      let result = 1
      for (const operand of node.operands) {
        result *= evaluateArithmeticNode(operand, context, evaluateLeaf)
      }
      return result
    }

    case "divide": {
      if (node.operands.length === 0) {
        throw new Error("Divide node requires at least one operand")
      }
      const values = node.operands.map((operand) =>
        evaluateArithmeticNode(operand, context, evaluateLeaf)
      )
      let result = requireFirst(values, "divide values")
      let isFirst = true
      for (const value of values) {
        if (isFirst) {
          isFirst = false
          continue
        }
        if (value === 0) {
          throw new Error(`Division by zero: dividing ${result} by ${value}`)
        }
        result = result / value
      }
      return result
    }

    case "floor": {
      const value = evaluateArithmeticNode(node.operand, context, evaluateLeaf)
      return Math.floor(value)
    }

    case "max": {
      if (node.operands.length === 0) {
        throw new Error("Max node requires at least one operand")
      }
      return Math.max(
        ...node.operands.map((operand) => evaluateArithmeticNode(operand, context, evaluateLeaf))
      )
    }

    case "min": {
      if (node.operands.length === 0) {
        throw new Error("Min node requires at least one operand")
      }
      return Math.min(
        ...node.operands.map((operand) => evaluateArithmeticNode(operand, context, evaluateLeaf))
      )
    }

    default:
      throw new Error("Unknown arithmetic node type")
  }
}
