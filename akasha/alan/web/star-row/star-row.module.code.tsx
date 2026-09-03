export const MAX_STARS = 5

export function StarRow({ stars }: { stars: number }) {
  const filled = Math.max(0, Math.min(MAX_STARS, stars))
  return (
    <span className="star-row" role="img" aria-label={`${filled} of ${MAX_STARS} stars`}>
      <span className="star-on">{"★".repeat(filled)}</span>
      <span className="star-off">{"☆".repeat(MAX_STARS - filled)}</span>
    </span>
  )
}
