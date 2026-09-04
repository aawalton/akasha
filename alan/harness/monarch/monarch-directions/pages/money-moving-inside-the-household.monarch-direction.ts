import type { MonarchDirection } from "../monarch-direction.page-type.ts"

export const moneyMovingInsideTheHousehold = {
  id: "01a06559-5ea9-700e-9643-a72f5f272746",
  pageTypeSlug: "monarch-direction",
  slug: "money-moving-inside-the-household",
  title: "Money Moving Inside The Household",
  definition:
    "what to weigh where a transaction may be one leg of a transfer between the family's own accounts",
  appliesWhen:
    "A transaction whose merchant name or bank statement reads as a payment, a transfer, an autopay, a draft between accounts, or the return or undoing of one — rather than as a purchase from a shop. It reaches a row on a card and a row in a bank account alike.",
  directs:
    "Settle whether this row is one leg of money moving between two accounts the household already holds, rather than money spent or money earned. Find the other leg: the same amount, the opposite sign, a different account, close in time. Weigh whether the legs pair one to one, and whether each leg is the movement it claims to be, reading what the statement text says became of it. Weigh what this household has settled the same shape as before. Where the legs do not pair cleanly the row is a person's to settle, and which way the pairing failed is most of what that person needs from you.",
} as const satisfies MonarchDirection
