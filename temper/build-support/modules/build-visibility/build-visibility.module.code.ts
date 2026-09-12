export type BuildVisibility = "private" | "unlisted" | "public" | "live" | "target"

export type SettableBuildVisibility = Exclude<BuildVisibility, "live" | "target">

export function toBuildVisibility(value: string | undefined): BuildVisibility {
  if (value === "public" || value === "unlisted" || value === "live" || value === "target")
    return value
  return "private"
}
