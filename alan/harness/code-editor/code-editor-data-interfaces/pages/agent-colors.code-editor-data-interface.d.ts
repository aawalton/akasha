// The color every agent is drawn in, and the color every turn state is drawn in, so the editor
// asks for neither. A value is the name of a color rather than what that name is drawn as.

declare type AgentColorsState = {
  readonly byAgent: Readonly<Record<string, string>>
  readonly byState: Readonly<Record<string, string>>
}
