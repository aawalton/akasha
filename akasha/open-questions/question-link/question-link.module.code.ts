export type QuestionLinkPlatform = "web" | "native"

export const QUESTION_LINK_PLATFORMS = ["web", "native"] as const

export type QuestionLink = {
  readonly label: string
  readonly url: string
  readonly platform: QuestionLinkPlatform
}
