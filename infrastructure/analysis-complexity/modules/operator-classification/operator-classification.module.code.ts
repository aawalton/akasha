import ts from "typescript"

export type TokenClass = "operator" | "operand" | "ignore"

const OPERAND_KINDS: ReadonlySet<ts.SyntaxKind> = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.PrivateIdentifier,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.BigIntLiteral,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.RegularExpressionLiteral,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.UndefinedKeyword,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.SuperKeyword,
])

const IGNORED_KINDS: ReadonlySet<ts.SyntaxKind> = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.EndOfFileToken,
  ts.SyntaxKind.SingleLineCommentTrivia,
  ts.SyntaxKind.MultiLineCommentTrivia,
  ts.SyntaxKind.WhitespaceTrivia,
  ts.SyntaxKind.NewLineTrivia,
  ts.SyntaxKind.ConflictMarkerTrivia,
  ts.SyntaxKind.ShebangTrivia,
  ts.SyntaxKind.NonTextFileMarkerTrivia,
])

const KEYWORD_OPERATOR_KINDS: ReadonlySet<ts.SyntaxKind> = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.NewKeyword,
  ts.SyntaxKind.DeleteKeyword,
  ts.SyntaxKind.TypeOfKeyword,
  ts.SyntaxKind.InstanceOfKeyword,
  ts.SyntaxKind.InKeyword,
  ts.SyntaxKind.OfKeyword,
  ts.SyntaxKind.VoidKeyword,
  ts.SyntaxKind.AwaitKeyword,
  ts.SyntaxKind.YieldKeyword,
  ts.SyntaxKind.AsKeyword,
  ts.SyntaxKind.SatisfiesKeyword,
  ts.SyntaxKind.IfKeyword,
  ts.SyntaxKind.ElseKeyword,
  ts.SyntaxKind.ForKeyword,
  ts.SyntaxKind.WhileKeyword,
  ts.SyntaxKind.DoKeyword,
  ts.SyntaxKind.SwitchKeyword,
  ts.SyntaxKind.CaseKeyword,
  ts.SyntaxKind.DefaultKeyword,
  ts.SyntaxKind.TryKeyword,
  ts.SyntaxKind.CatchKeyword,
  ts.SyntaxKind.FinallyKeyword,
  ts.SyntaxKind.ThrowKeyword,
  ts.SyntaxKind.ReturnKeyword,
  ts.SyntaxKind.BreakKeyword,
  ts.SyntaxKind.ContinueKeyword,
  ts.SyntaxKind.VarKeyword,
  ts.SyntaxKind.LetKeyword,
  ts.SyntaxKind.ConstKeyword,
  ts.SyntaxKind.FunctionKeyword,
  ts.SyntaxKind.ClassKeyword,
  ts.SyntaxKind.ExtendsKeyword,
  ts.SyntaxKind.ImplementsKeyword,
  ts.SyntaxKind.StaticKeyword,
  ts.SyntaxKind.PublicKeyword,
  ts.SyntaxKind.PrivateKeyword,
  ts.SyntaxKind.ProtectedKeyword,
  ts.SyntaxKind.ReadonlyKeyword,
  ts.SyntaxKind.AsyncKeyword,
])

export function classifyToken(kind: ts.SyntaxKind): TokenClass {
  if (OPERAND_KINDS.has(kind)) return "operand"
  if (IGNORED_KINDS.has(kind)) return "ignore"
  if (KEYWORD_OPERATOR_KINDS.has(kind)) return "operator"
  if (kind >= ts.SyntaxKind.FirstPunctuation && kind <= ts.SyntaxKind.LastPunctuation) {
    return "operator"
  }
  return "ignore"
}
