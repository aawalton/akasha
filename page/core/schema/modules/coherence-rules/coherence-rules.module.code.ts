import { z } from "zod"

const ValueInRuleSchema = z
  .object({
    kind: z.literal("valueIn"),
    key: z.string().min(1),
    allowed: z.array(z.string().min(1)).min(1),
  })
  .strict()

const RequiresRuleSchema = z
  .object({
    kind: z.literal("requires"),
    when: z.object({ key: z.string().min(1), eq: z.string().min(1) }).strict(),
    require: z.array(z.array(z.string().min(1)).min(1)).min(1),
  })
  .strict()

const NumericEqualityWhenPresentRuleSchema = z
  .object({
    kind: z.literal("numericEqualityWhenPresent"),
    whenPresent: z.string().min(1),
    left: z.string().min(1),
    right: z.string().min(1),
  })
  .strict()

const MoveValueToListWhenValueInRuleSchema = z
  .object({
    kind: z.literal("moveValueToListWhenValueIn"),
    when: z.object({ key: z.string().min(1), in: z.array(z.string().min(1)).min(1) }).strict(),
    from: z.string().min(1),
    to: z.string().min(1),
  })
  .strict()

const CoherenceRuleSchema = z.discriminatedUnion("kind", [
  ValueInRuleSchema,
  RequiresRuleSchema,
  NumericEqualityWhenPresentRuleSchema,
  MoveValueToListWhenValueInRuleSchema,
])

export type CoherenceRule = z.infer<typeof CoherenceRuleSchema>
