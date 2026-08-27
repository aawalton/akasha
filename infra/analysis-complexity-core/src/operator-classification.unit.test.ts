import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { classifyToken } from "./operator-classification"

describe("classifyToken — Halstead operator/operand classification", () => {
  describe("operators", () => {
    test.each([
      ["PlusToken", ts.SyntaxKind.PlusToken],
      ["MinusToken", ts.SyntaxKind.MinusToken],
      ["AsteriskToken", ts.SyntaxKind.AsteriskToken],
      ["SlashToken", ts.SyntaxKind.SlashToken],
      ["EqualsEqualsEqualsToken", ts.SyntaxKind.EqualsEqualsEqualsToken],
      ["AmpersandAmpersandToken", ts.SyntaxKind.AmpersandAmpersandToken],
      ["BarBarToken", ts.SyntaxKind.BarBarToken],
      ["QuestionQuestionToken", ts.SyntaxKind.QuestionQuestionToken],
      ["QuestionDotToken", ts.SyntaxKind.QuestionDotToken],
      ["EqualsGreaterThanToken", ts.SyntaxKind.EqualsGreaterThanToken],
      ["DotToken", ts.SyntaxKind.DotToken],
      ["IfKeyword", ts.SyntaxKind.IfKeyword],
      ["ElseKeyword", ts.SyntaxKind.ElseKeyword],
      ["ForKeyword", ts.SyntaxKind.ForKeyword],
      ["WhileKeyword", ts.SyntaxKind.WhileKeyword],
      ["ReturnKeyword", ts.SyntaxKind.ReturnKeyword],
      ["NewKeyword", ts.SyntaxKind.NewKeyword],
      ["TypeOfKeyword", ts.SyntaxKind.TypeOfKeyword],
      ["AwaitKeyword", ts.SyntaxKind.AwaitKeyword],
      ["AsKeyword", ts.SyntaxKind.AsKeyword],
    ])("%s → operator", (_label, kind) => {
      expect(classifyToken(kind)).toBe("operator")
    })
  })

  describe("operands", () => {
    test.each([
      ["Identifier", ts.SyntaxKind.Identifier],
      ["NumericLiteral", ts.SyntaxKind.NumericLiteral],
      ["StringLiteral", ts.SyntaxKind.StringLiteral],
      ["NoSubstitutionTemplateLiteral", ts.SyntaxKind.NoSubstitutionTemplateLiteral],
      ["RegularExpressionLiteral", ts.SyntaxKind.RegularExpressionLiteral],
      ["TrueKeyword", ts.SyntaxKind.TrueKeyword],
      ["FalseKeyword", ts.SyntaxKind.FalseKeyword],
      ["NullKeyword", ts.SyntaxKind.NullKeyword],
      ["ThisKeyword", ts.SyntaxKind.ThisKeyword],
      ["SuperKeyword", ts.SyntaxKind.SuperKeyword],
    ])("%s → operand", (_label, kind) => {
      expect(classifyToken(kind)).toBe("operand")
    })
  })

  describe("ignored", () => {
    test.each([
      ["EndOfFileToken", ts.SyntaxKind.EndOfFileToken],
      ["SingleLineCommentTrivia", ts.SyntaxKind.SingleLineCommentTrivia],
      ["MultiLineCommentTrivia", ts.SyntaxKind.MultiLineCommentTrivia],
      ["WhitespaceTrivia", ts.SyntaxKind.WhitespaceTrivia],
      ["NewLineTrivia", ts.SyntaxKind.NewLineTrivia],
    ])("%s → ignore", (_label, kind) => {
      expect(classifyToken(kind)).toBe("ignore")
    })
  })
})
