export const HIRELING_MAILS_DAILY_TARGET = 100

export interface HirelingMailCount {
  date: string
  count: number
}

export function hirelingCountForToday(prev: HirelingMailCount | undefined, today: string): number {
  return prev !== undefined && prev.date === today ? prev.count : 0
}

export function nextHirelingMailCount(
  prev: HirelingMailCount | undefined,
  today: string,
  delta: number
): HirelingMailCount {
  return { date: today, count: hirelingCountForToday(prev, today) + delta }
}
