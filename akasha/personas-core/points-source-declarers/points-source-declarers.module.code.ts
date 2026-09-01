export const EXTERNAL_POINTS_SOURCE_KIND = "external"

export const WINDOWED_POINTS_SOURCE_KIND = "windowed"

export const STORY_WORDS_POINTS_SOURCE = "story-chapter-words"

export const CHESS_PRACTICE_POINTS_SOURCE = "chess-practice-points"

export const TOWER_WORDS_POINTS_SOURCE = "tower-words"

export const WORDS_READ_POINTS_SOURCE = "words-read"

export const ANIME_EPISODE_POINTS_SOURCE = "anime-episode-completions"

export const GBWW_CHAPTER_POINTS_SOURCE = "gbww-chapter-completions"

export interface PointsSourceDeclarerRow {
  readonly pointsSourceKind?: string | null | undefined
  readonly pointsSource?: string | null | undefined
}

export function declaresPointsSource(row: PointsSourceDeclarerRow, source: string): boolean {
  return row.pointsSourceKind === EXTERNAL_POINTS_SOURCE_KIND && row.pointsSource === source
}

export function personasDeclaringPointsSource<T extends PointsSourceDeclarerRow>(
  rows: readonly T[],
  source: string
): readonly T[] {
  return rows.filter((row) => declaresPointsSource(row, source))
}
