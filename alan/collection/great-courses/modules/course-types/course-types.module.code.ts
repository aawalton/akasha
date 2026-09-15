export interface Course {
  readonly title: string
  readonly url: string
  readonly externalId: string
}

export interface Subject {
  readonly title: string
  readonly url: string
  readonly courses: readonly Course[]
}

export interface CourseList {
  readonly courses: readonly Course[]
}

export interface SubjectList {
  readonly subjects: readonly Subject[]
}
